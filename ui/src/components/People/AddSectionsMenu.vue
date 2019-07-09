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
            @click.stop="showForm(item.index)"
          >
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
    axios.get("/practitioner/describe/definition/Practitioner").then(response => {
      if (response.status === 201) {
        const ParseConformance = require("fhir").ParseConformance;
        const parser = new ParseConformance();

        const primitiveTypes = [
          "base64Binary",
          "boolean",
          "canonical",
          "code",
          "date",
          "dateTime",
          "decimal",
          "id",
          "instant",
          "markdown",
          "oid",
          "positiveInt",
          "string",
          "time",
          "unsignedInt",
          "uri",
          "url",
          "uuid"
        ];

        let fields = parser.parseStructureDefinition(response.data);
        let menu = [];

        // add in descriptions
        fields._properties.map(field => {
          response.data.snapshot.element.forEach(function(element) {
            if (element.id === "Practitioner." + field._name) {
              field._short = element.short;
            }
          });
        });

        fields._properties.forEach(function(field, index) {
          if (field._properties || primitiveTypes.indexOf(field._type) < 0) {
            menu.push({
              subtitle: field._short,
              title: field._name,
              index: index
            });
          }
        });

        this.fields = fields._properties;
        this.menu = menu;
      }
    });
  },
  data() {
    return {
      fields: [],
      menu: []
    };
  },
  methods: {
    showForm(index) {
      this.$emit(
        "toggleForm",
        this.fields[index]._properties,
        this.fields[index]._name
      );
    }
  }
};
</script>
