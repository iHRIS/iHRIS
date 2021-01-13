<template>
  <v-container>
    <v-dialog
      persistent
      v-model="statusDialog.enable"
      max-width="400"
    >
      <v-card>
        <v-toolbar
          :color="statusDialog.color"
        >
          <v-toolbar-title>
            <v-icon v-text="statusDialog.icon"></v-icon>
            {{statusDialog.title}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click.native="statusDialog.enable = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <center>
        <v-card-text>
          <b>{{statusDialog.description}}</b>
          <!-- <v-layout row wrap v-if="Object.keys(sendStatus).length > 0">
            <v-flex xs5>
              <label style='color:green'>Success</label>
            </v-flex>
            <v-flex xs3>
              <b>{{sendStatus.success}}</b>
            </v-flex>
            <v-flex xs5>
              <label style='color:red'>Failed</label>
            </v-flex>
            <v-flex xs3>
              <b>{{sendStatus.failed}}</b>
            </v-flex>
          </v-layout> -->
        </v-card-text>
        </center>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dark
            class="white--font"
            color="primary"
            @click="statusDialog.enable = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="progressDialog"
      hide-overlay
      persistent
      width="500"
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
            <template v-if="communicationType == 'flow'">
              Workflow
              <template v-if="frequency === 'recurring' || (frequency === 'once' && sendTimeCategory === 'later')">
                Scheduling
              </template>
              <template v-else>
                Starting
              </template> Progress
            </template>
            <template v-else>
              Message
              <template v-if="frequency === 'recurring' || (frequency === 'once' && sendTimeCategory === 'later')">
                Scheduling
              </template>
              <template v-else>
                Sending
              </template> Progress
            </template>
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
            <v-flex xs5>
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
            <v-flex xs5>
              <v-alert
                outlined
                border="top"
                elevation="12"
                text
                type="error"
              >Failed: {{sendStatus.failed.toLocaleString()}}</v-alert>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="progressData.statusText == 'Completed'"
            color="success"
            rounded
            @click="progressDialog = false"
          >
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-img
      src="@/assets/mHero.png"
      width="100"
    ></v-img>
    <v-card>
      <v-card-text>
        Do you want to send an existing workflow or a new message?
        <v-radio-group v-model="communicationType">
          <v-layout
            row
            wrap
          >
            <v-flex xs4>
              <v-radio
                label="Use existing message flow**"
                value="flow"
              ></v-radio>
            </v-flex>
            <v-flex xs4>
              <v-radio
                label="Create new message**"
                value="sms"
              ></v-radio>
            </v-flex>
          </v-layout>
        </v-radio-group>
        <v-autocomplete
          v-if="communicationType == 'flow'"
          background-color="grey lighten-2"
          v-model="workflow"
          label="Select flow from RapidPro"
          :items="workflows"
          return-object
        >
        </v-autocomplete>
        <v-textarea
          v-if="communicationType == 'sms'"
          background-color="grey lighten-2"
          color="blue"
          label="Text Message"
          v-model="sms"
          @input="countCharacters"
        ></v-textarea>
        <template v-if="communicationType == 'sms'">
          {{chars}}/{{totalChars}}
        </template>
        <v-card v-if="showFrequence">
          <v-card-title primary-title>
            Frequency*
          </v-card-title>
          <v-card-title secondary-title>

          </v-card-title>
          <v-card-text>
            How often do you want to send the workflow
            <v-radio-group
              row
              v-model="frequency"
            >
              <v-radio
                label="Once"
                value="once"
              ></v-radio>
              <v-radio
                label="Recurring"
                value="recurring"
              ></v-radio>
            </v-radio-group>
            <v-row v-if="recurring">
              <div>
                <VueCronEditorBuefy v-model="cronExpression" :preserveStateOnSwitchToAdvanced='true'/>
              </div>
            </v-row>
            <v-card v-if="frequency === 'once'">
              <v-card-title>
                Send Time*
              </v-card-title>
              <v-card-text>
                <v-radio-group
                  row
                  v-model="sendTimeCategory"
                >
                  <v-radio
                    label="Now"
                    value="now"
                  ></v-radio>
                  <v-radio
                    label="Later"
                    value="later"
                  ></v-radio>
                </v-radio-group>
                <v-row v-if="sendTimeCategory === 'later'">
                  <v-col sm="2">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          label="Date*"
                          hint="DD/MM/YYYY"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="sendDate"
                        no-title
                        @input="dateMenu = false"
                        :min="minDate"
                        :max="maxDate"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col sm="2">
                    <v-menu
                      ref="timeMenu"
                      v-model="timeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="sendTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="sendTime"
                          label="Time*"
                          prepend-icon="mdi-clock-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timeMenu"
                        v-model="sendTime"
                        format="24hr"
                        full-width
                        @click:minute="$refs.timeMenu.save(sendTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <br>
    <v-card>
      <v-card-title>
        Recipients
      </v-card-title>
      <ihrisReport v-if="sendToMatchingTerms"
        report='ihris-es-report-mhero-send-message'
        :terms="terms" :hideFilters="true"
        :hideCheckboxes="true"
        :hideLabel="true"
      />
      <v-data-table
        v-else
        :headers="headers"
        :items="practitioners"
        item-key="id"
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="secondary">
        <v-btn
          normal
          @click="changeDetails"
          rounded
        ><v-icon left>mdi-pencil</v-icon> Edit Recipients</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!canSend"
          normal
          @click="send"
          rounded
        >
          <v-icon left>mdi-message</v-icon>
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ihrisReport from "@/views/es-report";
import VueCronEditorBuefy from 'vue-cron-editor-buefy';
export default {
  props: ["headers", "practitioners", "terms", "sendToMatchingTerms", "reportData"],
  data: vm => ({
    chars: 0,
    totalChars: 160,
    workflows: [],
    workflow: {},
    communicationType: "",
    sms: "",
    statusDialog: {
      width: '500px',
      enable: false,
      color: 'error',
      icon: 'mdi-alert-circle-outline',
      title: '',
      description: ''
    },
    cronExpression: "14 14 */3 * *",
    frequency: false,
    sendTimeCategory: '',
    sendTime: null,
    sendStatus: {},
    progressReqTimer: '',
    progressData: {},
    progressDialog: false,
    timeMenu: false,
    dateMenu: false,
    sendDate: new Date().toISOString().substr(0, 10),
    sendDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
  }),
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    changeDetails() {
      this.$emit("editWorkflow");
    },
    countCharacters() {
      this.chars = this.sms.length
    },
    send() {
      this.progressData = {}
      this.sendStatus = {}
      let practitioners = [];
      this.practitioners.forEach(practitioner => {
        let id = practitioner.mheropractitioner.split('/')
        if(id.length === 2) {
          id = id[1]
        } else {
          id = practitioner.mheropractitioner
        }
        practitioners.push(id);
      });
      let data = {
        practitioners: practitioners,
        workflow: this.workflow.id,
        terms: this.terms,
        sendToMatchingTerms: this.sendToMatchingTerms,
        reportData: this.reportData
      };
      if(this.frequency === 'recurring' || (this.frequency === 'once' && this.sendTimeCategory === 'later')) {
        data.cronExpression = this.cronExpression
      }
      data.frequency = this.frequency
      data.sendTimeCategory = this.sendTimeCategory
      if (this.communicationType === "sms") {
        data.sms = this.sms;
        data.workflow = null;
      } else if (this.communicationType === "flow") {
        data.workflow = this.workflow.id;
        data.sms = null;
      }
      data = JSON.stringify(data);
      let url = "/mhero/send-message";
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data,
        redirect: "manual"
      };
      this.$store.state.progress.enabled = true
      this.$store.state.progress.title = "Processing request..."
      fetch(url, opts)
      .then(response => {
        this.$store.state.progress.enabled = false
        this.progressDialog = true
        // this.statusDialog.enable = true
        if(response.status >= 200 && response.status <= 299) {
          this.statusDialog.color = 'success'
          this.statusDialog.title = 'Done'
          if(this.communicationType === "sms") {
            this.statusDialog.description = 'Message Processed Successfully'
          } else {
            this.statusDialog.description = 'Workflow Processed Successfully'
          }
        } else {
          this.$store.state.progress.enabled = false
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          if(this.communicationType === "sms") {
            this.statusDialog.description = 'Some errors occured while sending message'
          } else {
            this.statusDialog.description = 'Some errors occured while starting a workflow'
          }
        }
        return response.json()
      })
      .then(respData => {
        this.progressReqTimer = setInterval(() => {
          this.getProgress(respData)
        }, 2000);
      })
      .catch(err => {
        console.log(err)
        this.$store.state.progress.enabled = false
        this.statusDialog.enable = true
        this.statusDialog.color = 'yellow'
        this.statusDialog.title = 'Warning'
        this.statusDialog.description = 'Processing is taking longer to complete. Server is still processing the request'
      });
    },
    getProgress(requestsIDs) {
      let url = `/mhero/getProgress?clientIDs=${JSON.stringify(requestsIDs)}`
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
          if(statusText != 'done') {
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
    }
  },
  watch: {
    frequency(value) {
      if(value === 'recurring') {
        this.cronExpression = '14 14 */3 * *'
      } else {
        this.cronExpression = ''
      }
    },
    sendTime(time) {
      let timeArr = time.split(':')
      let dateArr = this.sendDate.split('-')
      this.cronExpression = timeArr[1] + " " + timeArr[0] + " " + dateArr[2] + " " + dateArr[1] + " *"
    },
    sendDate(date) {
      if(!this.sendTime) {
        return
      }
      let timeArr = this.sendTime.split(':')
      let dateArr = date.split('-')
      this.cronExpression = timeArr[1] + " " + timeArr[0] + " " + dateArr[2] + " " + dateArr[1] + " *"
    }
  },
  computed: {
    minDate() {
      return this.$moment().format("YYYY-MM-DD")
    },
    maxDate() {
      return this.$moment(this.$moment().subtract("days", 1).format("YYYY-MM-DD"), "YYYY-MM-DD").add("years", 1).format("YYYY-MM-DD")
    },
    computedDateFormatted () {
      return this.formatDate(this.sendDate)
    },
    canSend() {
      if (!this.communicationType) {
        return false;
      } else if (this.communicationType == "sms" && !this.sms) {
        return false;
      } else if (this.communicationType === "flow" && !this.workflow.id) {
        return false;
      }
      if(!this.frequency) {
        return false
      }
      if(this.frequency === 'recurring' && !this.cronExpression) {
        return false
      }
      if(this.frequency === 'once' && !this.sendTimeCategory) {
        return false
      }
      if(this.frequency === 'once' && this.sendTimeCategory === 'later' && !this.cronExpression) {
        return false
      }
      return true;
    },
    showFrequence() {
      if(this.communicationType === 'flow' && Object.keys(this.workflow).length > 0) {
        return true
      }
      if(this.communicationType === 'sms' && this.sms) {
        return true
      }
      return false
    },
    recurring() {
      return this.frequency === "recurring";
    },
    showRecurringOptions() {
      return this.frequency === "recurring" && this.period === "weeks";
    }
  },
  created() {
    fetch("/mhero/workflows").then(response => {
      response.json().then(data => {
        this.workflows = data;
      });
    });
  },
  components: {
    VueCronEditorBuefy,
    ihrisReport: ihrisReport
  },
};
</script>
