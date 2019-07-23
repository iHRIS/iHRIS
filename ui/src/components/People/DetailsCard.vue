<template>
  <v-card class="mb-5">
    <v-card-title class="display-1">
      {{ this.name }}
      <v-spacer />
      <v-btn
        fab
        class="primary"
        @click.stop="
          editing = true;
          editButton = false;
        "
        v-show="editButton || edit"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text
      v-for="(value, name) in data"
      v-show="!editing"
      v-bind:key="name"
    >
      <div v-if="Array.isArray(value) || typeof value === 'object'">
        <div v-if="Number.isInteger(name)">
          <div v-for="(data, fieldIndex) in value" v-bind:key="fieldIndex">
            <v-layout row>
              <v-flex xs4 class="font-weight-bold">{{ fieldIndex }}</v-flex>
              <v-flex xs8>{{ data }}</v-flex>
            </v-layout>

            <v-divider class="pb-3" />
          </div>
        </div>
        <div v-else>
          <v-layout row>
            <v-flex xs4 class="font-weight-bold">{{ name }}</v-flex>
            <v-flex xs8 v-for="(data, index) in value" v-bind:key="index">
              {{ data }}
            </v-flex>
          </v-layout>

          <v-divider class="pb-3" />
        </div>
      </div>
      <div v-else>
        <v-layout row>
          <v-flex xs4 class="font-weight-bold">{{ name }}</v-flex>
          <v-flex xs8>{{ value }}</v-flex>
        </v-layout>

        <v-divider class="pb-3" />
      </div>
    </v-card-text>

    <v-card-text v-show="editing">
      <v-alert v-model="alert.show" dismissable :type="alert.type">
        {{ alert.message }}
      </v-alert>

      <DynamicForm
        :fields="this.fields"
        :name="this.name"
        v-on:cancel="cancel"
        v-on:successfulSubmit="submit"
        v-on:failedSubmit="showFailedSubmit"
        ref="dynamicEditingForm"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    DynamicForm
  },
  created() {
    if (this.edit) {
      this.editButton = true;
      let definition = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      let component = this;

      axios
        .get("/practitioner/describe/definition/" + definition)
        .then(response => {
          if (response.status === 201) {
            const ParseConformance = require("fhir").ParseConformance;
            const parser = new ParseConformance();

            let fields = parser.parseStructureDefinition(response.data);
            let data = [];

            // add in descriptions
            fields._properties.map(field => {
              response.data.snapshot.element.forEach(function(element) {
                if (element.id === definition + field._name) {
                  field._short = element.short;
                }
              });
            });

            fields._properties.forEach(function(field) {
              for (var key in component.data) {
                if (key === field._name) {
                  data.push({
                    id: field._name,
                    description: field._short,
                    name: field._name,
                    required: field._required,
                    type: field._type,
                    value: component.data[key]
                  });
                }
              }
            });

            this.fields = data;
            this.$refs.dynamicEditingForm.changeFields(data);
          }
        })
        .catch(error => {
          this.showAlert(error, "error");
        });
    }
  },
  data() {
    return {
      alert: {
        message: null,
        show: false,
        type: null
      },
      editButton: false,
      editing: false,
      fields: []
    };
  },
  methods: {
    cancel() {
      this.editing = false;
      this.editButton = true;
    },
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;
    },
    showFailedSubmit() {
      this.alert.message = "Invalid input, please correct all errors.";
      this.alert.type = "error";
      this.alert.show = true;
    },
    submit() {
      this.$emit(
        "saveData",
        this.$refs.dynamicEditingForm.getInputs(),
        this.$refs.dynamicEditingForm.getName()
      );
    }
  },
  props: {
    data: {},
    edit: {
      default: false,
      type: Boolean
    },
    name: {
      default: null,
      type: String
    }
  }
};
</script>
