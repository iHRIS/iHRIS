<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-text>
        <v-autocomplete label="Workflow" :items="workflows"> </v-autocomplete>

        How often should this workflow be sent?

        <v-radio-group row v-model="frequency">
          <v-radio label="Once" value="once"></v-radio>
          <v-radio label="Recurring" value="recurring"></v-radio>
        </v-radio-group>
        <v-row v-if="recurring">
          <v-col cols="1">
            <v-subheader>Every</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-text-field label="Frequency"></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-select label="Period" :items="items"> </v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        Practitioners
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        loading
        loading-text="Loading....Please wait"
        :headers="headers"
        :items="practitioners"
        :search="search"
        item-key="name"
        show-select
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn :to="{ name: 'mhero-review' }">Review Selection</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    recurring() {
      return this.frequency === "recurring";
    }
  },
  created() {
    const config = require("@/config/config.json");

    axios.get(config.backend + "/mhero/workflows").then(response => {
      let workflows = [];

      response.data.entry.forEach(workflow => {
        let id = workflow.resource.id;
        let value = null;

        for (var i in workflow.resource.extension[0].extension) {
          let extension = workflow.resource.extension[0].extension[i];

          if (extension.url === "name") {
            value = extension.valueString;
            break;
          }
        }

        workflows.push({
          text: value,
          value: id
        });
      });

      this.workflows = workflows;
    });

    axios.get(config.backend + "/practitioner/all").then(response => {
      let practitioners = [];

      response.data.forEach(practitioner => {
        practitioner = practitioner.resource;

        let name = "";

        if (practitioner.name) {
          let practitionerName = null;

          // first, try for an official name
          for (var i in practitioner.name) {
            if (practitioner.name[i].use === "official") {
              practitionerName = practitioner.name[i];
              break;
            }
          }

          if (practitionerName === null) {
            practitionerName = practitioner.name[i];
          }

          if (practitionerName.text) {
            name = practitionerName.text;
          } else {
            if (practitionerName.given && practitionerName.given[0]) {
              name += practitionerName.given[0] + " ";
            }

            if (practitionerName.family) {
              name += practitionerName.family;
            }

            name = name.trim();
          }
        }

        if (name) {
          practitioners.push({
            name: name
          });
        }
      });

      this.practitioners = practitioners;
    });
  },
  data() {
    return {
      search: null,
      selected: [],
      frequency: false,
      items: ["minutes", "hours", "days", "weeks"],
      headers: [
        { text: "Name", value: "name" },
        { text: "Jurisdiction", value: "jurisdiction" },
        { text: "Facility", value: "facility" },
        { text: "Cadre", value: "cadre" },
        { text: "Organization", value: "organization" },
        { text: "Contact Group", value: "contactGroup" }
      ],
      practitioners: [],
      workflows: []
    };
  }
};
</script>
