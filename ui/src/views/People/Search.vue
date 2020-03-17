<template>
  <v-container grid-list-md>
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
export default {

  mixins: [MobileLayout],
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
  created() {
    this.config = require("@/config/config.json");
  },
  components: {
    Alert,
    DynamicForm
  },
  
  data() {
    return {
      config: null,
      headers: [],
      fields: [],
      practitioners: []
    };
  },
  created() {
    this.config = require("@/config/config.json");
    this.getDataTableFields().then(fields => {
      this.headers = fields
    });
    this.getSearchFilters().then(filters => {
        this.fields = filters;
        this.$refs.searchForm.data = this.fields;
        this.$refs.searchForm.inputs = this.fields
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
        return Promise.resolve(datatable_fields)
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
          allFields.push({
            id: field.id.substring(field.id.lastIndexOf(".") + 1),
            max: parseInt(field.max),
            name: field.id.substring(field.id.lastIndexOf(".") + 1),
            required: false,
            type: field.type[0].code,
            value: null,
            label: field.short
          });
        });
      });
      return Promise.resolve(allFields);
    },
    search() {
      let params = {
        params: this.$refs.searchForm.getInputs()
      };

      axios
        .get(this.config.backend + "/practitioner/search", params)
        .then(response => {
          let practitioners = [];

          response.data.entry.forEach(practitioner => {
            practitioners.push({
              editLink: "/people/edit/" + practitioner.resource.id,
              viewLink: "/people/view/" + practitioner.resource.id,
              surname: practitioner.resource.name[0].family,
              given: practitioner.resource.name[0].given[0]
            });
          });

          this.practitioners = practitioners;
        });
    },
    showError() {
      this.$refs.searchAlert.showMessage(
        "Could not get search results",
        "error"
      );
    }
  },
  components: {
    Alert,
    DynamicForm
  }
};
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: #b3d4fc;
}
</style>
