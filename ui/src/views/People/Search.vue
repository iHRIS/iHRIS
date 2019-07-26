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
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title class="display-1">Search</v-card-title>
          <v-card-text>
            <DynamicForm
              :fields="this.fields"
              cancelLabel="clear"
              ref="searchForm"
            />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    DynamicForm
  },
  data() {
    return {
      headers: [
        {
          text: "",
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
          name: "Name",
          required: false,
          type: "string",
          value: null
        }
      ]
    };
  }
}
</script>
