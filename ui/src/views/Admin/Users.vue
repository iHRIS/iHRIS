<template>
  <v-container>
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="users" :items-per-page="10">
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

    axios.get(this.config.backend + "/user/list").then(response => {
      if (response.data.entry) {
        response.data.entry.forEach(person => {
          let extensions = person.resource.extension;

          // find the username value
          for (var i in extensions) {
            if (extensions[i].url.includes("iHRISUserDetails")) {
              let userExtensions = extensions[i].extension;

              for (var j in userExtensions) {
                if (userExtensions[j].url == "username") {
                  this.users.push({
                    username: userExtensions[j].valueString
                  });
                }
              }
            }
          }
        });
      }
    });
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
