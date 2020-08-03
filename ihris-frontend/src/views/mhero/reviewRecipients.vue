<template>
  <v-container>
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
            <v-flex xs2>
              <v-radio
                label="Workflow"
                value="flow"
              ></v-radio>
            </v-flex>
            <v-flex xs2>
              <v-radio
                label="Ad-hoc Message"
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
      sms: ""
    };
  },
  methods: {
    changeDetails() {
      this.$emit("editWorkflow");
    },
    send() {
      let practitioners = [];

      this.practitioners.forEach(practitioner => {
        practitioners.push(practitioner.id);
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
      fetch(url, opts).then(() => {
        console.log("Success");
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
