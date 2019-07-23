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
import axios from "axios";

export default {
  created() {
    let component = this;

    axios
      .get("/practitioner/describe/definition/Practitioner")
      .then(response => {
        if (response.status === 201) {
          const ParseConformance = require("fhir").ParseConformance;
          const parser = new ParseConformance();

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
            if (
              field._properties ||
              component._self.primitiveTypes.indexOf(field._type) < 0
            ) {
              menu.push({
                subtitle: field._short,
                title: field._name,
                index: index,
                definition: field._type
              });
            }
          });

          this.menu = menu;
        }
      });
  },
  data() {
    return {
      fields: [],
      menu: [],
      primitiveTypes: [
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
      ]
    };
  },
  methods: {
    describe(definition) {
      let component = this;

      return axios
        .get(
          "/practitioner/describe/definition/" +
            definition.charAt(0).toUpperCase() +
            definition.slice(1)
        )
        .then(response => {
          if (response.status != 201) {
            return [];
          }

          let fields = [];

          response.data.snapshot.element.forEach(function(field) {
            if (field.id.indexOf(".") >= 0) {
              let sanitizedField = field.id.slice(field.id.indexOf(".") + 1);

              if (sanitizedField == "id" || field.type[0].code == "Extension") {
                return;
              }

              if (
                component._self.primitiveTypes.indexOf(field.type[0].code) >= 0
              ) {
                fields.push({
                  subtitle: field.definition,
                  title: field.short,
                  id: sanitizedField,
                  name: sanitizedField,
                  type: field.type[0].code,
                  required: field.min > 0
                });
              } else {
                fields[sanitizedField] = component._self.describe(
                  sanitizedField
                );
              }
            }
          });

          return fields;
        })
        .catch(err => {
          return [err];
        });
    },
    showForm(title, definition) {
      this._self.describe(definition).then(fields => {
        this.$emit("toggleForm", fields, title);
      });
    }
  }
};
</script>
