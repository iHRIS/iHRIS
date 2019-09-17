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
          <v-list-tile
            active-class="primary darken-2"
            @click.stop="showForm(item.title, item.definition)"
          >
            <v-list-tile-content>
              <v-list-tile-title class="text-uppercase font-weight-bold">
                {{ item.title | sentenceCase }}
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
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  created() {
    let practitioner = this.data;

    this.describe("Practitioner").then(response => {
      const config = require("../../../config/config.json");

      let menu = [];
      let index = 0;

      for (var key in response) {
        if (
          !practitioner[key] &&
          response.hasOwnProperty(key) &&
          response[key].title &&
          config.ignoredSubsections.indexOf(response[key].title.toLowerCase()) <
            0 &&
          response[key].subtitle
        ) {
          if (response[key].object) {
            menu.push({
              subtitle: response[key].subtitle,
              title: response[key].title,
              index: index++,
              definition: response[key].type
            });
          }
        }
      }

      this.menu = menu;
    });
  },
  data() {
    return {
      fields: [],
      menu: []
    };
  },
  methods: {
    showForm(title, definition) {
      this._self.describe(definition, "Practitioner").then(fields => {
        if (definition == "BackboneElement") {
          this.$emit("toggleForm", fields[title], title);
        } else {
          this.$emit("toggleForm", fields, title);
        }
      });
    }
  },
  mixins: [StructureDefinition],
  props: ["data"]
};
</script>
