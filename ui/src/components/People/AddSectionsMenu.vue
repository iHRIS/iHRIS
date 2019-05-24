<template>
        <v-card class="primary darken-1 white--text">
          <v-card-title class="display-1">Add Sections</v-card-title>
          <v-list class="primary darken-1 white--text">
            <v-list-group
              v-for="item in menu"
              :key="item.title"
              prepend-icon="add"
              no-action
              class="pb-3"
            >
              <template v-slot:activator>
                <v-list-tile active-class="primary darken-2">
                  <v-list-tile-content>
                    <v-list-tile-title class="text-uppercase font-weight-bold">
                      {{ item.title }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="white--text">
                      {{ item.subtitle }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list-group>
          </v-list>
        </v-card>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios.get("/practitioner/describe").then(response => {
      if (response.status === 201) {
        const primitiveTypes = ["base64Binary", "boolean", "canonical", "code", "date", "dateTime", "decimal", "id", "instant", "markdown", "oid", "positiveInt", "string", "time", "unsignedInt", "uri", "url", "uuid"];
        let menu = [];

        response.data.forEach(function(field) {
          if (field.type) {
            if (primitiveTypes.indexOf(field.type[0].code) === -1) {
              var name = field.id.replace(/^Practitioner\./, "");

              if (!name.includes(".")) {
                menu.push({
                  subtitle: field.short,
                  title: name
                });
              }
            }
          }
        });

        this.menu = menu;
      }
    });
  },
  data() {
    return {
      menu: []
    };
  }
};
</script>
