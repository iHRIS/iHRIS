<template>
  <v-container grid-list-md>
    <v-layout row wrap class="pb-5">
      <v-flex xs6 class="display-2 text-xs-left">
        Search People
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs9>
        <v-card>
          <v-card-title class="display-1">Results</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="practitioners"
              :items-per-page="5"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td><a :href="props.item.editLink">Edit</a></td>
                <td>{{ props.item.given }}</td>
                <td>{{ props.item.surname }}</td>
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

export default {
  components: {
    Alert,
    DynamicForm
  },
  data() {
    return {
      headers: [
        {
          text: "Edit",
          align: "left",
          sortable: false,
          value: "editLink"
        },
        {
          text: "Surname",
          value: "surname"
        },
        {
          text: "Given name",
          value: "given"
        }
      ],
      fields: [
        {
          id: "name",
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
        .get("/practitioner/search", params)
        .then(response => {
          let practitioners = [];

          response.data.entry.forEach(practitioner => {
            practitioners.push({
              editLink: "/people/edit/" + practitioner.resource.id,
              surname: practitioner.resource.name[0].family,
              given: practitioner.resource.name[0].given[0]
            });
          });

          console.log(practitioners);

          this.practitioners = practitioners;
        });
    },
    showError() {
      this.$refs.searchAlert.showMessage("Could not get search results", "error");
    }
  }
}
</script>
