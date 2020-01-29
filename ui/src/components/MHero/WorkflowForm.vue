<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-text>
        <v-autocomplete
          :search-input.sync="workflowName"
          v-model="workflow"
          label="Workflow"
          :items="workflows"
        >
        </v-autocomplete>

        How often should this workflow be sent?

        <v-radio-group row v-model="frequency">
          <v-radio label="Once" value="once"></v-radio>
          <v-radio label="Recurring" value="recurring"></v-radio>
        </v-radio-group>
        <v-row v-if="recurring">
          <v-col cols="1">
            <v-subheader>Every</v-subheader>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="frequencyAmount"
              label="Frequency"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select v-model="period" label="Period" :items="items">
            </v-select>
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
        item-key="id"
        show-select
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn @click="nextStep">Review Selection</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

import Practitioner from "@/mixins/Practitioner.js";

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

      response.data.forEach(record => {
        let practitioner = record._source;

        let cadre = "";
        let contactGroup = "";
        let facility = "";
        let id = practitioner.practitioner.slice(
          practitioner.practitioner.lastIndexOf("/") + 1
        );
        let jurisdiction = "";
        let name = "";
        let organization = "";

        // get the name of the practitioner
        if (practitioner.given) {
          name = practitioner.given;
        }

        if (practitioner.family) {
          name += " " + practitioner.family;
        }

        name = name.trim();

        if (practitioner.FacilityName) {
          facility = practitioner.FacilityName;
        }

        if (practitioner.positionTitle) {
          cadre = practitioner.positionTitle;
        }

        if (name) {
          practitioners.push({
            cadre: cadre,
            contactGroup: contactGroup,
            facility: facility,
            id: id,
            jurisdiction: jurisdiction,
            name: name,
            organization: organization
          });
        }
      });

      this.practitioners = practitioners;
    });
  },
  data() {
    return {
      frequency: false,
      frequencyAmount: null,
      headers: [
        { text: "Name", value: "name" },
        { text: "Jurisdiction", value: "jurisdiction" },
        { text: "Facility", value: "facility" },
        { text: "Cadre", value: "cadre" },
        { text: "Organization", value: "organization" },
        { text: "Contact Group", value: "contactGroup" }
      ],
      items: ["minutes", "hours", "days", "weeks"],
      period: null,
      practitioners: [],
      search: null,
      selected: [],
      workflow: null,
      workflowName: null,
      workflows: []
    };
  },
  methods: {
    nextStep() {
      this.$emit(
        "nextStep",
        this.selected,
        this.frequency,
        this.frequencyAmount,
        this.period,
        this.workflow,
        this.workflowName
      );
    }
  },
  mixins: [Practitioner]
};
</script>
