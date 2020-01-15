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
          @click.stop="showForm(item.title, item.type, item.raw)"
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
  computed: {
    menu() {
      let menu = {};

      for (var index in this.sections) {
        let field = this.sections[index];
        let label = null;
        let id = null;

        // if we have data set for this field, then don't render it
        if (field.id.includes("extension:")) {
          id = field.id.slice(field.id.lastIndexOf(":") + 1);
        } else {
          id = field.id.slice(field.id.lastIndexOf(".") + 1);
        }

        // data is set, don't continue with this field
        if (this.data[id]) {
          continue;
        } else if (field.type[0].code && field.type[0].code === "Extension") {
          let profile = field.type[0].profile[0];

          for (var i in this.data.extension) {
            let extension = this.data.extension[i];

            if (extension.url === profile) {
              return;
            }
          }
        }

        // if a label field exists, use that
        // otherwise, go with the last text before the period
        if (field.label) {
          label = field.label;
        } else {
          label = field.id.slice(field.id.lastIndexOf(".") + 1);
        }

        menu[field.id] = {};
        menu[field.id].title = label;
        menu[field.id].index = field.id;
        menu[field.id].raw = field;
        menu[field.id].subtitle = field.description;

        // set the type, used to show the correct fields
        if (field.type[0].code && field.type[0].code !== "Extension") {
          menu[field.id].type = field.type[0].code;
        } else if (
          field.type[0].code === "Extension" &&
          field.type[0].profile[0]
        ) {
          let type = field.type[0].profile[0];
          menu[field.id].type = type.slice(type.lastIndexOf("/") + 1);
        }
      }

      return menu;
    }
  },
  created() {
    this.sections = [];

    this.getSections().then(fields => {
      fields.forEach(field => {
        this.$set(this.sections, field.id, field);

        // get the subtitle. if a description value is set, use that
        if (field.description) {
          this.sections[field.id].description = field.description;
        } else if (field.definition) {
          this.sections[field.id].description = field.definition;
        } else if (field.path == "Practitioner.extension") {
          // if this is an extension, load the structure definition and get the description from that
          let type = field.type[0].profile[0];
          let structureDefinition = type.slice(type.lastIndexOf("/") + 1);

          axios
            .get(
              this.config.backend +
                "/practitioner/describe/definition/" +
                structureDefinition
            )
            .then(extension => {
              // use the description field for the subtitle
              if (extension.data.description) {
                this.sections[field.id].description =
                  extension.data.description;
              }
            });
        }
      });
    });
  },
  data() {
    return {
      fields: [],
      sections: []
    };
  },
  mixins: [Practitioner, StructureDefinition],
  props: ["data"]
};
</script>
