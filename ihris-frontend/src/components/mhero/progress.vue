<template>
  <v-container grid-list-xs>
    <v-dialog
      v-model="progressDialog"
      hide-overlay
      persistent
      width="800"
    >
      <v-card
        color="white"
        dark
      >
        <v-toolbar
          color="success"
        >
          <v-toolbar-title>
            <v-icon>mdi-info</v-icon>
            {{title}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <center>
            <font style="color:blue">
              <template v-if="!progressData.statusText">
                Sending Request
              </template>
              <template v-else>
                {{progressData.step}}/{{progressData.totalSteps}} {{progressData.statusText}}
                <template v-if="progressData.statusText == 'Completed' && progressData.error">
                  <font style="color: red; font-weight: bold">- {{progressData.error}}</font>
                </template>
                <template v-else-if="progressData.statusText == 'Completed'">
                  <font style="color: green; font-weight: bold">- Successfully</font>
                </template>
              </template>
            </font><br>
            <v-progress-circular
              v-if="progressData.percent != null"
              :rotate="-90"
              :size="100"
              :width="15"
              :value="progressData.percent"
              color="primary"
            >
              <v-avatar
                color="indigo"
                size="50px"
              >
                <span class="white--text">
                  <b>{{ progressData.percent }}%</b>
                </span>
              </v-avatar>
            </v-progress-circular>
            <v-progress-linear
              indeterminate
              color="red"
              class="mb-0"
              v-else-if="progressData.statusText != 'Completed'"
            ></v-progress-linear>
          </center>
          <br>
          <v-layout row wrap v-if="Object.keys(sendStatus).length > 0">
            <v-flex xs3>
              <v-alert
                outlined
                border="top"
                elevation="12"
                color="green"
                text
                type="success"
              >Success: {{sendStatus.success.toLocaleString()}}</v-alert>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-alert
                outlined
                border="top"
                elevation="12"
                text
                type="error"
              >Failed: {{sendStatus.failed.toLocaleString()}}</v-alert>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3>
              <v-alert
                outlined
                border="top"
                elevation="12"
                text
                type="warning"
              >Ignored: {{sendStatus.ignored.toLocaleString()}}</v-alert>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="progressData.statusText == 'Completed'"
            color="success"
            rounded
            @click="closeProgressDialog"
          >
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  props: {
    progressDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    requestIDs: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      progressReqTimer: '',
      sendStatus: {},
      progressData: {},
    }
  },
  watch: {
    progressDialog(value) {
      if(value) {
        this.progressReqTimer = setInterval(() => {
          this.getProgress()
        }, 2000);
      }
    }
  },
  methods: {
    getProgress() {
      let url = `/mhero/getProgress?requestIDs=${JSON.stringify(this.requestIDs)}`
      fetch(url)
      .then(response => {
        return response.json()
      })
      .then(respData => {
        let totalRecords = 0
        let processedRecords = 0
        let statusText = ''
        let step = 0
        let totalSteps = 0
        let allCompleted = true
        let errorOccured = false
        let sendStatus = {}
        for(let resp of respData) {
          totalSteps = resp.totalSteps
          if(resp.totalRecords) {
            totalRecords += resp.totalRecords
          }
          if(resp.processedRecords) {
            processedRecords += resp.processedRecords
          }
          if(resp.step && resp.step > step) {
            statusText = resp.status
            step = resp.step
          }
          if(resp.status != 'done') {
            allCompleted = false
          }
          if(resp.error) {
            errorOccured = resp.error;
          }
          if(resp.sendStatus && resp.sendStatus[resp.id]) {
            for(let msgID in resp.sendStatus[resp.id]) {
              for(let status in resp.sendStatus[resp.id][msgID]) {
                if(!sendStatus[resp.id]) {
                  sendStatus[resp.id] = {}
                }
                if(!sendStatus[resp.id][status]) {
                  sendStatus[resp.id][status] = 0
                }
                sendStatus[resp.id][status] = parseInt(resp.sendStatus[resp.id][msgID][status])
              }
            }
          }
        }
        this.sendStatus = {}
        for(let id in sendStatus) {
          for(let status in sendStatus[id]) {
            if(!this.sendStatus[status]) {
              this.sendStatus[status] = 0
            }
            this.sendStatus[status] += sendStatus[id][status]
          }
        }
        if(allCompleted) {
          clearInterval(this.progressReqTimer)
          this.clearProgressData()
          statusText = 'Completed'
        }
        this.progressData = {
          step,
          totalSteps,
          totalRecords,
          processedRecords,
          statusText,
          error: errorOccured
        }
        if(step > 1) {
          if(processedRecords > 0) {
            this.progressData.percent = processedRecords/totalRecords*100
          } else {
            this.progressData.percent = 0
          }
          this.progressData.percent = Number.parseFloat(this.progressData.percent).toFixed(1)
        } else {
          this.progressData.percent = null
        }
      })
    },
    clearProgressData() {
      let url = `/mhero/clearProgress?requestIDs=${JSON.stringify(this.requestIDs)}`
      fetch(url)
      .catch((err) => {
        console.log(err);
      })
    },
    closeProgressDialog() {
      this.sendStatus = {}
      this.progressData = {}
      this.$emit('closeProgressDialog')
    }
  }
}
</script>