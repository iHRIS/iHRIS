<template>
  <v-container>
    <v-alert type="success" v-model="alert">
      Messages sent!
    </v-alert>
    <v-card class="mb-5">
      <v-card-title> Workflow: {{ workflowName }} </v-card-title>
      <v-card-text>
        Frequency: {{ frequency }}

        <div v-if="frequency === 'recurring'">
          Every {{ amount }} {{ period }}
        </div>
      </v-card-text>
    </v-card>

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
        <v-btn normal @click="changeDetails">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn normal v-on:click="send">Send Workflow</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Jurisdiction", value: "jurisdiction" },
        { text: "Facility", value: "facility" },
        { text: "Cadre", value: "cadre" },
        { text: "Organization", value: "organization" },
        { text: "Contact Group", value: "contactGroup" }
      ]
    };
  },
  methods: {
    changeDetails() {
      this.$emit("editWorkflow");
    },
    send() {
      this.alert = true;
    }
  },
  props: [
    "amount",
    "frequency",
    "period",
    "practitioners",
    "workflow",
    "workflowName"
  ]
};
</script>
