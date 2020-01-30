<template>
  <v-autocomplete
    :items="codes"
    :label="label"
    outline
    :required="required"
    :value="value"
    :v-model="reference"
    :rules="[rules.required]"
    @change="changeValue"
    :hint="hint"
  >
    <template v-slot:item="data">
      <template v-if="data.item.value">
        <v-list-item-content v-text="data.item.text"></v-list-item-content>
      </template>
      <template v-else>
        <v-btn
          class="font-weight-bold primary--text text-uppercase"
          text
          depressed
          @click.stop="showAddForm"
        >
          Add Another
        </v-btn>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let config = require("@/config/config.json");
    let structureDefinition = this.structureDefinition.slice(
      this.structureDefinition.lastIndexOf("/") + 1
    );

    axios
      .get(config.backend + "/structure-definition/all/" + structureDefinition)
      .then(response => {
        let options = [];

        response.data.forEach(data => {
          // figure out what field we want to use, usually name or text
          let description = null;

          if (data.resource.name) {
            description = data.resource.name;
          } else if (data.resource.text) {
            description = data.resource.text;
          } else {
            description = data.resource.id;
          }

          options.push({
            text: description,
            value: data.resource.id
          });
        });

        options.push({
          text: '<a href="http://www.google.com>Add Another</a>',
          value: null
        });

        this.codes = options;
        this.reference = this.value;
      });
  },
  data() {
    return {
      codes: [],
      reference: null,
      rules: {
        required: value => {
          if (!this.required || value) {
            return true;
          }
          return "Field is required";
        }
      }
    };
  },
  methods: {
    changeValue(value) {
      this.reference = value;
    },
    getInput() {
      return this["reference"];
    }
  },
  props: ["label", "required", "value", "hint", "max", "structureDefinition"]
};
</script>
