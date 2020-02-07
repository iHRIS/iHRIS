<template>
  <v-container grid-list-md>
  <v-alert v-model="alert" dismissable type="error">
        {{ error }}
  </v-alert>
    <v-layout row wrap class="pb-5" >
      <v-flex xs6 class="display-2 text-xs-left">
        Search People
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="allowedToAccess">
      <v-flex xs9>
        <v-card>
          <v-card-title class="display-1">Results</v-card-title>
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
      <v-flex xs3>
        <v-card>
          <v-card-title class="display-1">Search</v-card-title>
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
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import { store } from "@/store.js";

export default {
  created() {
    this.config = require("@/config/config.json");
    if(!store.state.allowToAccessTheNextPage)
    {
      this.error = "The user does not have the necessary privileges to access this page ";
      this.alert = true;
      this.allowedToAccess=false;
    }
  },
  components: {
    Alert,
    'DynamicForm':store.state.isAllowToAccessTheNextPage?DynamicForm:null
  },
  data() {
    return {
      config: null,
      alert: false,
      error: "",
      allowedToAccess:true,
      headers: [
        {
          text: "Surname",
          value: "surname"
        },
        {
          text: "Given name",
          value: "given"
        },
        {
          text: "Actions",
          align: "left",
          sortable: false,
          value: "action"
        }
      ],
      fields: [
        {
          id: "name",
          max: 1,
          name: "name",
          required: false,
          type: "string",
          value: null
        }
      ],
      practitioners: []
    };
  },
  methods: {
    clearResults() {
      this.practitioners = [];
      this.$refs.searchAlert.reset();
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
  }
};
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: #b3d4fc;
}
</style>
