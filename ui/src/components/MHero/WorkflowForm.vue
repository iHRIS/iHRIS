<template>
  <v-container>
    <Alert ref="alert" />
    <v-form ref="form">
      <v-card class="mb-5">
        <v-card-text>
          <v-autocomplete
            :search-input.sync="workflowName"
            v-model="workflow"
            label="Select flow from RapidPro"
            :items="workflows"
            :rules="[rules.required]"
          >
          </v-autocomplete>

          How often should this workflow be sent?

          <v-radio-group row v-model="frequency" :rules="[rules.required]">
            <v-radio label="Once" value="once"></v-radio>
            <v-radio label="Recurring" value="recurring"></v-radio>
          </v-radio-group>
          <v-row v-if="recurring">
            <v-col cols="2">
              <v-select v-model="period" label="Period" :items="items" />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="frequencyAmount"
                prefix="Recur every"
                :suffix="frequencySuffix"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="recurring" v-model="showRecurringOptions">
            <v-col cols="1" />
            <v-checkbox
              v-for="item in recurringOptions"
              :key="item"
              class="mx-2"
              :label="item"
              :value="item"
              v-model="frequencySpecifics"
            />
          </v-row>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="pb-0">
          Practitioners
        </v-card-title>
        <v-data-table
          v-model="selected"
          :loading="loading"
          loading-text="Loading....Please wait"
          :headers="headers"
          :items="practitioners"
          item-key="id"
          class="elevation-1"
          show-select
        >
          <template v-slot:top>
            <!-- v-container, v-col and v-row are just for decoration purposes. -->
            <v-container fluid class="pt-0">
              <v-row>
                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-text-field
                      v-model="searchSelected"
                      type="text"
                      label="Search"
                    ></v-text-field>
                  </v-row>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-autocomplete
                      label="Facilities"
                      :items="facilities"
                      v-model="facilitySelected"
                      chips
                      multiple
                    />
                  </v-row>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-autocomplete
                      label="Jurisdictions"
                      :items="jurisdictions"
                      v-model="jurisdictionSelected"
                      chips
                      multiple
                    />
                  </v-row>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-autocomplete
                      label="Cadres"
                      :items="cadres"
                      v-model="cadreSelected"
                      chips
                      multiple
                    />
                  </v-row>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-autocomplete
                      label="Organizational Affiliations"
                      :items="organizations"
                      v-model="organizationSelected"
                      chips
                      multiple
                    />
                  </v-row>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-row class="pa-6">
                    <v-autocomplete
                      label="Contact Groups"
                      :items="contactGroups"
                      v-model="contactGroupSelected"
                      chips
                      multiple
                    />
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
        <v-card-actions class="secondary">
          <v-spacer></v-spacer>
          <v-btn @click="nextStep">Review Selection</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import Practitioner from "@/mixins/Practitioner.js";

export default {
  components: {
    Alert
  },
  computed: {
    frequencySuffix() {
      if (this.period) {
        let suffix = this.period.substring(0, this.period.length - 1) + "(s)";

        if (this.period === "weeks") {
          suffix += " on ";
        }

        return suffix;
      }

      return null;
    },
    recurring() {
      return this.frequency === "recurring";
    },
    recurringOptions() {
      if (this.frequency !== "recurring") {
        return [];
      }

      if (this.period === "weeks") {
        return [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
      }

      return [];
    },
    showRecurringOptions() {
      return this.frequency === "recurring" && this.period === "weeks";
    }
  },
  created() {
    const config = require("@/config/config.json");

    axios
      .get(config.backend + "/mhero/workflows")
      .then(response => {
        let workflows = [];

        if (
          !response ||
          !Object.prototype.hasOwnProperty.call(response, "data") ||
          !Object.prototype.hasOwnProperty.call(response.data, "entry") ||
          !response.data.entry.length
        ) {
          this.$refs.alert.changeMessage(
            "No workflows found. Messages will not be sent.",
            "error"
          );

          return;
        }

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
      })
      .catch(() => {
        this.$refs.alert.changeMessage(
          "Could not get workflows from server.",
          "error"
        );
      });

    axios.get(config.backend + "/practitioner/all").then(response => {
      console.log(response);
      let practitioners = [];

      if (
        !response ||
        !Object.prototype.hasOwnProperty.call(response, "data") ||
        !response.data.length
      ) {
        this.$refs.alert.changeMessage(
          "No practitioners found. Messages will not be sent.",
          "error"
        );
        return;
      }

      let cadres = [];
      let contactGroups = [];
      let facilities = [];
      let jurisdictions = [];
      let organizations = [];

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
        let phone = "";

        // get the name of the practitioner
        if (practitioner.given) {
          name = practitioner.given;
        }

        if (practitioner.family) {
          name += " " + practitioner.family;
        }

        name = name.trim();

        if (practitioner.facilityName) {
          facility = practitioner.facilityName;

          if (facilities.indexOf(facility) < 0) {
            facilities.push(facility);
          }
        }

        if (practitioner.positionTitle) {
          cadre = practitioner.positionTitle;

          if (cadres.indexOf(cadre) < 0) {
            cadres.push(cadre);
          }
        }

        if (practitioner.phone) {
          phone = practitioner.phone;
        }

        if (name) {
          practitioners.push({
            cadre: cadre,
            contactGroup: contactGroup,
            facility: facility,
            id: id,
            jurisdiction: jurisdiction,
            name: name,
            phone: phone,
            organization: organization
          });
        }
      });

      cadres.sort();
      contactGroups.sort();
      facilities.sort();
      jurisdictions.sort();
      organizations.sort();

      this.cadres = cadres;
      this.contactGroups = contactGroups;
      this.facilities = facilities;
      this.jurisdictions = jurisdictions;
      this.organizations = organizations;
      this.practitioners = practitioners;
      this.loading = false;
    });
  },
  data() {
    return {
      cadres: [],
      cadreSelected: [],
      contactGroups: [],
      contactGroupSelected: [],
      facilities: [],
      facilitySelected: [],
      frequency: false,
      frequencyAmount: null,
      frequencySpecifics: [],
      headers: [
        { text: "Name", value: "name", filter: this.searchFilter },
        {
          text: "Jurisdiction",
          value: "jurisdiction",
          filter: this.jurisdictionFilter
        },
        { text: "Facility", value: "facility", filter: this.facilityFilter },
        { text: "Cadre", value: "cadre", filter: this.cadreFilter },
        {
          text: "Organizational Affiliation",
          value: "organization",
          filter: this.organizationFilter
        },
        { text: "Phone Number", value: "phone" },
        {
          text: "Contact Group",
          value: "contactGroup",
          filter: this.contactGroupFilter
        }
      ],
      items: ["hours", "days", "weeks"],
      jurisdictions: [],
      jurisdictionSelected: [],
      loading: true,
      organizations: [],
      organizationSelected: [],
      period: null,
      practitioners: [],
      rules: {
        required: value => {
          if (value) {
            return true;
          }

          return "Field is required";
        }
      },
      search: null,
      searchSelected: null,
      selected: [],
      workflow: null,
      workflowName: null,
      workflows: []
    };
  },
  methods: {
    cadreFilter(value) {
      return this.filterColumn(value, this.cadreSelected);
    },
    contactGroupFilter(value) {
      return this.filterColumn(value, this.contactGroupSelected);
    },
    facilityFilter(value) {
      return this.filterColumn(value, this.facilitySelected);
    },
    filterColumn(value, selected) {
      if (!selected.length) {
        return true;
      }

      return selected.includes(value);
    },
    jurisdictionFilter(value) {
      return this.filterColumn(value, this.jurisdictionSelected);
    },
    nextStep() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "nextStep",
          this.selected,
          this.frequency,
          this.frequencyAmount,
          this.period,
          this.workflow,
          this.workflowName,
          this.frequencySpecifics
        );
      }
    },
    organizationFilter(value) {
      return this.filterColumn(value, this.organizationSelected);
    },
    searchFilter(value) {
      if (!this.searchSelected) {
        return true;
      }

      return value.toLowerCase().includes(this.searchSelected.toLowerCase());
    }
  },
  mixins: [Practitioner]
};
</script>
