<template>
  <v-row >
    <v-dialog
        v-model="dialog"
        max-width="700px"
        persistent
    >
      <v-card class="pt-4 pb-8">
        <v-card-title class="justify-center mb-4">
          <span v-if="!loading" class="text-h5 ">{{ $t('App.hardcoded-texts.Select Your file') }}</span>
        </v-card-title>
        <v-card-text v-if="!loading" :disabled="loading">
          <input
              ref="excel-upload-input"
              accept=".xlsx, .xls, .csv"
              class="excel-upload-input"
              type="file"
              @change="handleClick"
          />
          <div class="drop" @dragenter="handleDragover" @dragover="handleDragover" @drop="handleDrop">
            {{ $t('App.hardcoded-texts.Drop excel file here or') }}
          </div>
        </v-card-text>
        <v-card-text v-if="!hasError&&loading" :disabled="loading" align="center">
          <v-progress-circular
              v-if="loading"
              :rotate="360"
              :size="100"
              :value="progress"
              :width="15"
              class="mb-8"
              color="green"
          >
            {{ progress }}
          </v-progress-circular>
          <h1 v-if="progress===100">{{ $t(`App.hardcoded-texts.Done Uploading Health Workers' Information`) }}</h1>
          <h1 v-else>{{ $t('App.hardcoded-texts.Uploading') }}...</h1>
        </v-card-text>
        <v-card-text v-if="hasError" :disabled="loading">
          <v-col style="text-align-last: center">
          <v-icon class="mb-8 icon">mdi-alert-circle</v-icon>
          <h2   class="mb-4 text-center">{{message}}</h2>
          </v-col>
          <ul class="ml-12" style="list-style-type: none">
            <li v-for="(item,index) in error" :key="index">
              <h3 class="mb-2"><v-icon class="mr-2">mdi-alert-circle</v-icon> Row {{ item.index }}</h3>
              <ul  v-for="(message,index) in item.errors" :key="index">
                <li style="list-style-type: none"><h4>{{ message }}</h4></li>
              </ul>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions class="pr-8 pt-6 mr-6">
          <v-spacer></v-spacer>
          <v-btn
              v-if="!loading || hasError"
              class="warning mr-4 pr-2"
              type="button"
              @click="cancelSelect"
          >
            <v-icon class="pr-2" dark>
              mdi-close
            </v-icon>
            {{ $t('App.hardcoded-texts.Cancel') }}
          </v-btn>
          <v-btn v-if="!loading"
                 color="primary"
                 type="button"
                 @click="handleUpload"
          >
            <v-icon class="pr-2" dark>
              mdi-folder
            </v-icon>
            {{ $t('App.hardcoded-texts.Browse') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import XLSX from "xlsx";
import axios from 'axios'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      hasError:false,
      message: "",
      error: [],
      snackbar: false,
      dialog: true,
      loading: false,
      progress: 0,
      excelData: {
        fileName: '',
        header: null,
        results: null,
      },
    };
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$toast.error("Only supports uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$toast.error(
            "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      if (!this.isExcel(rawFile)) {
        this.$toast.error(
            "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }

      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      if (!this.beforeUpload) {
        this.parseData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.parseData(rawFile);
      }
    },
    parseData(rawFile) {
      this.loading = true;
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          this.progress = Math.round((e.loaded / e.total) * 100)
          console.log("loading progress" + this.progress)
          const workbook = XLSX.read(data, {type: "array", cellDates: true, dateNF: 'yyyy/mm/dd;@'});
          const finalData = Object.keys(workbook.Sheets).map((name) => ({data: XLSX.utils.sheet_to_json(workbook.Sheets[name])}))
          axios.post(`/config/bulkRegistration`, finalData[0].data).then((response) => {
            if (response.status === 201) {
              this.message = "Users created Successfully!"
              this.snackbar = true
              setTimeout(() =>{
                this.$router.push('/resource/search/practitioner')
              }, 2000);
            }else if(!response.data.isValid){
              console.log(response.data.message)
              if(response.data.rows.length > 5){
                this.error = null
                this.hasError = true
                this.snackbar = true
                let indexes = response.data.rows.map(i=>i+2)
                this.message = `The uploaded document contains some incorrect data, Please check you're data at row ${indexes.join()}. `
              }else{
                this.error = response.data.message
                this.hasError = true
                this.message = `The uploaded document contains some incorrect data, please check you're data at `
                this.snackbar = true
              }

            }
            else {
              this.hasError = true
              this.loading = false
              this.$router.push('/resource/search/practitioner')
            }
          }).catch(e => console.log(e))
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);

      });
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    cancelSelect() {
      this.dialog = false;
      this.$router.push({path: "/resource/search/practitioner"})
    }
  },
};
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}

.icon {
  font-size: 64px;
  color: red;
}

.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>