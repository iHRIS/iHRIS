<template>
  <v-container grid-list-md>
    <v-alert v-model="alert" dismissable type="error">
      {{ error }}
    </v-alert>
    <v-layout row wrap class="pb-5">
      <v-flex :class="applyTitleStyle">
        Search People
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pb-5" v-if="checkIfSmallScreen">
      <v-flex :class="applyGridLayout">
        <v-card>
          <v-card-title :class="applyCardTitleStyle">Search</v-card-title>
          <v-card-text>
            <Alert ref="searchAlert" />
            <DynamicForm
              :fields="this.fields"
              cancelLabel="clear"
              ref="searchForm"
              v-on:cancel="clearResults"
              v-on:failedSubmit="showError"
              v-on:successfulSubmit="search"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex :class="applyGridLayoutResult">
        <v-card>
          <v-card-title :class="applyCardTitleStyle">Results</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="practitioners"
              :sort-by="['surname', 'Given']"
              :sort-desc="[false, false]"
              multi-sort
              :items-per-page="5"
            >
              <template v-slot:item.action="{ item }">
                <v-btn icon :href="item.editLink" text>
                  <v-icon small class="mr-2">
                    edit
                  </v-icon>
                </v-btn>
                <v-btn icon :href="item.viewLink" text>
                  <v-icon small>
                    visibility
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-if="!checkIfSmallScreen">
        <v-card>
          <v-card-title class="display-1">Search</v-card-title>
          <v-card-text>
            <Alert ref="searchAlert" />
            <DynamicForm
              :fields="fields"
              cancelLabel="clear"
              ref="searchForm"
              v-on:cancel="clearResults"
              v-on:failedSubmit="showError"
              v-on:successfulSubmit="search"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import MobileLayout from "@/mixins/MobileLayout.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  mixins: [MobileLayout, StructureDefinition],
  computed: {
    applyTitleStyle() {
      return this.titleStyleSearchPeople(this.$vuetify.breakpoint.name);
    },
    checkIfSmallScreen() {
      return this.smallScreenSearchCompute(this.$vuetify.breakpoint.name);
    },
    applyCardTitleStyle() {
      return this.cardTitleStyle(this.$vuetify.breakpoint.name);
    },
    applyGridLayout() {
      return this.gridLayoutSearchResult(this.$vuetify.breakpoint.name);
    },
    applyGridLayoutResult() {
      return this.gridLayoutShowResult(this.$vuetify.breakpoint.name);
    }
  },
  components: {
    Alert,
    DynamicForm
  },
  data() {
    return {
      config: null,
      alert: false,
      error: "",
      headers: [],
      fields: [],
      practitioners: []
    };
  },
  created() {
    this.config = require("@/config/config.json");
    this.getDataTableFields().then(fields => {
      this.headers = fields;
    });
    this.getSearchFilters().then(filters => {
      this.fields = filters;
      this.$refs.searchForm.data = this.fields;
      this.$refs.searchForm.inputs = this.fields;
    });
  },
  methods: {
    clearResults() {
      this.practitioners = [];
      this.$refs.searchAlert.reset();
    },
    getDataTableFields() {
      return axios
        .get(
          this.config.backend +
            "/practitioner/describe/definition/iHRISSearchPeopleFields"
        )
        .then(response => {
          let fields = response.data.snapshot.element;
          let datatable_fields = [];
          fields.forEach(field => {
            if (
              // ignore extension fields
              field.id.endsWith(".extension") ||
              // these are all custom extensions but duplicated fields
              field.id.endsWith(".id") ||
              field.id.endsWith(".url") ||
              field.id.includes(".value[x]") ||
              // ignore practitioner and meta fields since they can't be customized
              field.id == "SearchPeopleFields" ||
              field.id == "SearchPeopleFields.meta" ||
              // hide active, that's handled separately
              field.id === "SearchPeopleFields.active" ||
              // if someone sets the max to be 0, then don't show it
              field.max == 0
            ) {
              return;
            }
            datatable_fields.push({
              text: field.label,
              value: field.sliceName
            });
          });
          datatable_fields.push({
            text: "Actions",
            value: "action",
            align: "left",
            sortable: false
          });
          return Promise.resolve(datatable_fields);
        });
    },
    getAllSearchFields() {
      return axios
        .get(
          this.config.backend +
            "/practitioner/describe/definition/iHRISSearchPeople"
        )
        .then(response => {
          let all_fields = response.data.snapshot.element;
          let search_fields = [];
          all_fields.forEach(field => {
            if (
              // ignore extension fields
              field.id.endsWith(".extension") ||
              // these are all custom extensions but duplicated fields
              field.id.endsWith(".id") ||
              field.id.endsWith(".url") ||
              field.id.includes(".value[x]") ||
              // ignore practitioner and meta fields since they can't be customized
              field.id == "iHRISSearchPeople" ||
              field.id == "iHRISSearchPeople.meta" ||
              // hide active, that's handled separately
              field.id === "iHRISSearchPeople.active" ||
              // if someone sets the max to be 0, then don't show it
              field.max == 0
            ) {
              return;
            }

            search_fields.push(field);
          });
          return Promise.resolve(search_fields);
        });
    },
    getSearchFilters() {
      let allFields = [];
      this.getAllSearchFields().then(fields => {
        fields.forEach(field => {
          let type = field.type[0].code;
          let name = field.id.slice(field.id.indexOf(".") + 1);
          name = name.replace("[x]", "");
          let reference = name;
          if (type === "Reference") {
            reference = field.type[0].targetProfile[0];
          }
          allFields.push({
            id: field.id.substring(field.id.lastIndexOf(".") + 1),
            max: parseInt(field.max),
            name: field.id.substring(field.id.lastIndexOf(".") + 1),
            required: false,
            type: type,
            value: null,
            reference: reference,
            label: field.short
          });
        });
      });
      return Promise.resolve(allFields);
    },
    search() {
      let inputs = this.getInputs();

      if (!inputs) return;

      let params = {
        params: inputs
      };
      axios
        .get(this.config.backend + "/practitioner/search", params)
        .then(response => {
          if (!response.data.length) {
            this.practitioners = [];
            return;
          }
          let practitioners = [];
          response.data.forEach(practitioner => {
            let id = practitioner._source.practitioner.substring(
              practitioner._source.practitioner.lastIndexOf("/") + 1
            );
            practitioners.push({
              editLink: "/people/edit/" + id,
              viewLink: "/people/view/" + id,
              surname: practitioner._source.family,
              firstname: practitioner._source.given,
              position_title: practitioner._source.positionTitle,
              facility: practitioner._source.facilityName,
              start_date: practitioner._source.startDate
            });
          });
          this.practitioners = practitioners;
        });
    },
    getInputs() {
      let inputs = {};
      let isEmpty = true;
      for (var field of this.$refs.searchForm.inputs) {
        let key = null;
        let name = field.name;
        if (
          this.primitiveTypes.indexOf(field.parentType) < 0 &&
          field.parentType !== null &&
          field.parentType !== undefined
        ) {
          key = field.id.toLowerCase();
        } else {
          key = field.name;
        }
        let input = this.$refs.searchForm.$refs[name];
        if (input) {
          let value = input[0].getInput();
          if (field.type === "Reference") {
            value = input[0].getSelectedText();
          }
          if (value) isEmpty = false;
          inputs[key] = value;
        }
      }
      if (isEmpty) {
        this.$refs.searchAlert.changeMessage(
          "At least one search filter must have a value",
          "error"
        );
        this.practitioners = [];
        return;
      }
      if (this.$refs.searchAlert.show) this.$refs.searchAlert.reset();
      return inputs;
    },
    showError() {
      this.$refs.searchAlert.showMessage(
        "Could not get search results",
        "error"
      );
    }
  }
};
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: #b3d4fc;
}
</style>
