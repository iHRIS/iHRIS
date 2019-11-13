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

// this is needed for date parsing but is picked up by the linter because it's technically not used
// eslint-disable-next-line
import datejs from "datejs";

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
              let user = {};

              for (var j in userExtensions) {
                if (userExtensions[j].url == "username") {
                  user.username = userExtensions[j].valueString;
                }

                if (userExtensions[j].url == "created") {
                  let created = Date.parse(userExtensions[j].valueString);
                  user.created = created.toString("yyyy-MM-dd HH:mm:ss");
                }
              }

              if (user) {
                this.users.push(user);
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
          text: "Created",
          value: "created"
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
