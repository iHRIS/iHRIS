<template>
  <v-container>
    <v-dialog
      persistent
      v-model="statusDialog.enable"
      max-width="300"
    >
      <v-card>
        <v-toolbar
          :color="statusDialog.color"
          dark
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
        <v-card-text>
          <b>{{statusDialog.description}}</b>
        </v-card-text>
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
    <v-img
      src="@/assets/mHero.png"
      width="100"
    ></v-img>
    <v-card>
      <v-card-text>
        How do you want to send Message
        <v-radio-group v-model="communicationType">
          <v-layout
            row
            wrap
          >
            <v-flex xs4>
              <v-radio
                label="Use existing message flow"
                value="flow"
              ></v-radio>
            </v-flex>
            <v-flex xs4>
              <v-radio
                label="Create new one time message"
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
        ></v-textarea>
      </v-card-text>
    </v-card>
    <br>
    <v-card>
      <v-card-title>
        Recipients
      </v-card-title>
      <v-data-table
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
        >Edit Recipients</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!canSend"
          normal
          @click="send"
          rounded
        >Send <v-icon>mdi-message</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["headers", "practitioners"],
  data() {
    return {
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
      }
    };
  },
  methods: {
    changeDetails() {
      this.$emit("editWorkflow");
    },
    send() {
      let practitioners = [];

      this.practitioners.forEach(practitioner => {
        let id = practitioner.practitioner.split('/')
        if(id.length === 2) {
          id = id[1]
        } else {
          id = practitioner.practitioner
        }
        practitioners.push(id);
      });

      let data = {
        practitioners: practitioners,
        workflow: this.workflow.id
      };
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
      fetch(url, opts).then((response) => {
        this.statusDialog.enable = true
        if(response.status >= 200 && response.status <= 299) {
          this.statusDialog.color = 'success'
          this.statusDialog.title = 'Success'
          if(this.communicationType === "sms") {
            this.statusDialog.description = 'Message Sent Successfully'
          } else {
            this.statusDialog.description = 'Workflow Started Successfully'
          }
        } else {
          this.statusDialog.color = 'error'
          this.statusDialog.title = 'Error'
          if(this.communicationType === "sms") {
            this.statusDialog.description = 'Failed to send Message'
          } else {
            this.statusDialog.description = 'Failed to start a workflow'
          }
        }
      }).catch(err => {
        this.statusDialog.enable = true
        this.statusDialog.color = 'error'
        this.statusDialog.title = 'Error'
        if(this.communicationType === "sms") {
          this.statusDialog.description = 'Failed to send Message'
        } else {
          this.statusDialog.description = 'Failed to start a workflow'
        }
        console.log(err);
      });
    }
  },
  computed: {
    canSend() {
      if (!this.communicationType) {
        return false;
      } else if (this.communicationType == "sms" && !this.sms) {
        return false;
      } else if (this.communicationType === "flow" && !this.workflow.id) {
        return false;
      }
      return true;
    }
  },
  created() {
    fetch("/mhero/workflows").then(response => {
      response.json().then(data => {
        this.workflows = data;
      });
    });
  }
};
</script>
