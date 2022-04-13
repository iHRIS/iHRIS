<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>

        <div v-if="page === 'practitioner'">
          <v-dialog v-model="dialog" max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary darken-1" dark v-bind="attrs" v-on="on">
                Import CSV
              </v-btn>
            </template>
            <v-card class="pt-4 pb-8">
              <v-card-title class="justify-center mb-4">
                <span v-if="!loading" class="text-h5">Select Your file</span>
              </v-card-title>
              <v-card-text v-if="!loading" :disabled="loading">
                <input
                  ref="excel-upload-input"
                  accept=".xlsx, .xls, .csv"
                  class="excel-upload-input"
                  type="file"
                  @change="handleClick"
                />
                <div
                  class="drop"
                  @dragenter="handleDragover"
                  @dragover="handleDragover"
                  @drop="handleDrop"
                >
                  Drop excel file here or
                </div>
              </v-card-text>
              <v-card-text
                v-if="!hasError && loading"
                :disabled="loading"
                align="center"
              >
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
                <h1 v-if="progress === 100">
                  Done Uploading Health Workers' Information
                </h1>
                <h1 v-else>uploading...</h1>
              </v-card-text>
              <v-card-text v-if="hasError" :disabled="loading">
                <v-col style="text-align-last: center">
                  <v-icon class="mb-8 icon">mdi-alert-circle</v-icon>
                  <h2 class="mb-4 text-center">{{ message }}</h2>
                </v-col>
                <ul class="ml-12" style="list-style-type: none">
                  <li v-for="(item, index) in error" :key="index">
                    <h3 class="mb-2">
                      <v-icon class="mr-2">mdi-alert-circle</v-icon> Row
                      {{ item.index }}
                    </h3>
                    <ul v-for="(message, index) in item.errors" :key="index">
                      <li style="list-style-type: none">
                        <h4>{{ message }}</h4>
                      </li>
                    </ul>
                  </li>
                </ul>
              </v-card-text>
              <v-card-actions class="pr-8 pt-6 mr-6">
                <v-btn
                  v-if="!loading || hasError"
                  class="warning ml-10 pr-2"
                  type="button"
                  @click="cancelSelect"
                >
                  <v-icon class="pr-2" dark> mdi-close </v-icon>
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!loading || hasError"
                  class="success mr-4 pr-2"
                  type="button"
                  @click="downloadInputCSVTemplate"
                >
                  <v-icon class="pr-2" dark> mdi-download </v-icon>
                  Sample XLSX
                </v-btn>

                <v-btn
                  v-if="!loading"
                  color="primary"
                  type="button"
                  @click="handleUpload"
                >
                  <v-icon class="pr-2" dark> mdi-folder </v-icon>
                  Browse
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div v-else-if="page === 'facility'"></div>
        <div v-else-if="page === 'auditevent'"></div>
        <div v-else>
          <v-btn
            :class="
              addLink ? addLink.class || 'primary darken-1' : 'primary darken-1'
            "
            :to="addLink ? addLink.url : '/resource/add/' + page"
          >
            <v-icon v-if="addLink && addLink.icon">{{ addLink.icon }}</v-icon>
            <v-icon v-else>mdi-database-plus</v-icon>

            Add {{ label }}
          </v-btn>
        </div>
      </v-card-title>
      <v-card-title>
        <slot></slot>
      </v-card-title>
      <v-card-subtitle v-if="error_message" class="white--text error">{{
        error_message
      }}</v-card-subtitle>
      <v-card-text>
        <v-container> </v-container>
        <v-data-table
          style="cursor: pointer"
          :headers="headers"
          :items="results"
          item-key="id"
          :options.sync="options"
          :server-items-length="total"
          :footer-props="{ 'items-per-page-options': [50, 100, 150, 200] }"
          :loading="loading"
          class="elevation-1"
          @click:row="clickIt"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
import axios from "axios";
export default {
  name: "ihris-search",
  props: [
    "profile",
    "fields",
    "label",
    "terms",
    "page",
    "resource",
    "add-link",
  ],
  data: function () {
    return {
      debug: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 50 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      error_message: null,
      update_again: { rerun: false, restart: false },

      hasError: false,
      message: "",
      error: [],
      snackbar: false,
      dialog: true,
      progress: 0,
      excelData: {
        fileName: "",
        header: null,
        results: null,
      },
    };
  },
  watch: {
    terms: {
      handler() {
        this.getData(true);
      },
      deep: true,
    },
    options: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  created: function () {
    for (let field of this.fields) {
      this.headers.push({ text: field[0], value: field[1] });
    }
  },
  mounted: function () {
    this.getData(true);
  },
  methods: {
    clickIt: function (record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id },
      });
    },
    checkRerun() {
      if (!this.loading && this.update_again.rerun) {
        this.getData(this.update_again.restart);
        this.update_again = { rerun: false, restart: false };
      }
    },

    // fetch data from the server
    getData(restart) {
      //console.log("getting data",restart)
      if (this.loading) {
        this.update_again.rerun = true;
        this.update_again.restart = this.update_again.restart || restart;
        return;
      }
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      if (this.options.page > 1) {
        if (this.options.page === this.prevPage - 1) {
          url = this.link.find((link) => link.relation === "previous").url;
        } else if (this.options.page === this.prevPage + 1) {
          url = this.link.find((link) => link.relation === "next").url;
        }
        // Should make this smarter to keep the _getpages parameter,
        // but the issue is with tracking permissions on the resource
        url = url
          .replace(/_getpages=[^&]*&*/, "")
          .replace("/fhir?", "/fhir/" + this.resource + "?");
        url = url.substring(url.indexOf("/fhir/"));

        //some of the hapi instances requires _total=accurate to always be available for them to return total resources
        if (url.indexOf("_total=accurate") === -1) {
          url = url + "&_total=accurate";
        }
        //add profile to url
        if (this.profile) {
          url = url + "&_profile=" + this.profile + "&_sort=-_lastUpdated";
        }
      }
      if (url === "") {
        let count = this.options.itemsPerPage || 10;
        let sort = "";
        for (let idx in this.options.sortBy) {
          if (sort) {
            sort += ",";
          }
          if (this.options.sortDesc[idx]) {
            sort += "-";
          }
          sort += this.options.sortBy[idx];
        }
        url =
          "/fhir/" +
          this.resource +
          "?_count=" +
          count +
          "&_total=accurate&_profile=" +
          this.profile +
          "&_sort=-_lastUpdated";
        let sTerms = Object.keys(this.terms);
        for (let term of sTerms) {
          if (Array.isArray(this.terms[term])) {
            if (this.terms[term].length > 0) {
              url += "&" + term + "=" + this.terms[term].join(",");
            }
          } else if (this.terms[term]) {
            url += "&" + term + "=" + this.terms[term];
          }
        }
        this.debug = url;
      }
      this.prevPage = this.options.page;
      //console.log("fetching",url)
      fetch(url)
        .then((response) => {
          response
            .json()
            .then(async (data) => {
              this.results = [];
              if (data.total > 0) {
                this.link = data.link;
                for (let entry of data.entry) {
                  let result = { id: entry.resource.id };
                  for (let field of this.fields) {
                    let fieldDisplay = this.$fhirpath.evaluate(
                      entry.resource,
                      field[1]
                    );
                    result[field[1]] = await this.$fhirutils.lookup(
                      fieldDisplay[0],
                      field[2]
                    );
                  }
                  this.results.push(result);
                }
              }
              this.total = data.total;
              this.loading = false;
              this.checkRerun();
            })
            .catch((err) => {
              this.loading = false;
              this.error_message = "Unable to load results.";
              this.checkRerun();
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          this.checkRerun();
          console.log(err);
        });
    },

    // import csv file  and save to database
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
          this.progress = Math.round((e.loaded / e.total) * 100);
          console.log("loading progress" + this.progress);
          const workbook = XLSX.read(data, {
            type: "array",
            cellDates: true,
            dateNF: "yyyy/mm/dd;@",
          });
          const finalData = Object.keys(workbook.Sheets).map((name) => ({
            data: XLSX.utils.sheet_to_json(workbook.Sheets[name]),
          }));
          axios
            .post(`/config/bulkRegistration`, finalData[0].data)
            .then((response) => {
              if (response.status === 201) {
                this.message = "Users created Successfully!";
                this.snackbar = true;
                this.loading = false;
                setTimeout(() => {
                  this.$router.push("/resource/search/practitioner");
                }, 2000);
              } else if (!response.data.isValid) {
                console.log(response.data.message);
                if (response.data.rows.length > 5) {
                  this.error = null;
                  this.hasError = true;
                  this.snackbar = true;
                  let indexes = response.data.rows.map((i) => i + 2);
                  this.message = `The uploaded document contains some incorrect data, Please check you're data at row ${indexes.join()}. `;
                } else {
                  this.error = response.data.message;
                  this.hasError = true;
                  this.message = `The uploaded document contains some incorrect data, please check you're data at `;
                  this.snackbar = true;
                }
              } else {
                this.hasError = true;
                this.loading = false;
                // this.$router.push(
                //   "/questionnaire/ihris-practitioner/practitioner"
                // );
              }
            })
            .catch((e) => console.log(e));
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
    },

    // download template csv file
    downloadInputCSVTemplate() {
      axios({
        url: "/config/csvTemplate",
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {

          let blob = new Blob([response.data], { type: "application/xlsx" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "SampleCSV.xlsx";
          link.click();
          this.loadingCv = false;
        })
        .catch((e) => {
          console.log(e);
          this.loadingCv = false;
        });
    },
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
