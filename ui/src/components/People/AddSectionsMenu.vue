<template>
  <v-card class="primary darken-1 white--text">
    <v-card-title class="display-1">Add Sections</v-card-title>
    <v-card-text>
      <v-list
        class="primary darken-1 white--text"
        v-for="item in menu"
        :key="item.title"
      >
        <v-list-item
          active-class="primary darken-2"
          class="pb-0"
          @click.stop="showForm(item.title, item.type)"
          three-line
        >
          <v-list-item-icon>
            <v-icon class="white--text">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="white--text text-uppercase font-weight-bold"
            >
              {{ item.title | sentenceCase }}
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import Practitioner from "@/mixins/Practitioner.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  created() {
    this.getSections().then(fields => {
      axios
        .get(
          this.config.backend +
            "/practitioner/describe/definition/Practitioner"
        )
        .then(practitioner => {
          let practitionerFields = practitioner.data.differential.element;

          fields.forEach(field => {
            let label = null;

            // if a label field exists, use that
            // otherwise, go with the last text before the period
            if (field.label) {
              label = field.label;
            } else {
              label = field.id.slice(field.id.lastIndexOf(".") + 1);
            }

            this.$set(this.menu, field.id, {});
            this.menu[field.id].title = label;
            this.menu[field.id].index = field.id;

            // get the subtitle. if a description value is set, use that
            if (field.description) {
              this.menu[field.id].subtitle = field.description;
            } else if (field.definition) {
              this.menu[field.id].subtitle = field.definition;
            } else if (field.path == "Practitioner.extension") {
              // if this is an extension, load the structure definition and get the description from that
              let type = field.type[0].profile[0];
              let structureDefinition = type.slice(type.lastIndexOf("/") + 1);

              // if it's an extension, the type is just the structure definition
              this.menu[field.id].type = structureDefinition;

              axios
                .get(
                  this.config.backend +
                    "/practitioner/describe/definition/" +
                    structureDefinition
                )
                .then(extension => {
                  // use the description field for the subtitle
                  if (extension.data.description) {
                    this.menu[field.id].subtitle = extension.data.description;
                  }
                });
            } else {
              // if not an extension, look for a match in the practitioner structure definition and use that
              for (var i in practitionerFields) {
                if (practitionerFields[i].id == field.id) {
                  this.menu[field.id].subtitle =
                    practitionerFields[i].definition;
                  this.menu[field.id].type =
                    practitionerFields[i].type[0].code;
                  break;
                }
              }
            }
          });
        });
      });
  },
  data() {
    return {
      fields: [],
      menu: {}
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
  mixins: [Practitioner, StructureDefinition],
  props: ["data"]
};
</script>
