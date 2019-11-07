<template>
  <v-container>
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="10"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null,
      headers: [
        {
          text: "Username",
          align: "left",
          value: "username"
        },
        {
          text: "Roles",
          sortable: false,
          value: "roles"
        }
      ],
      users: []
    };
  }
};
</script>
