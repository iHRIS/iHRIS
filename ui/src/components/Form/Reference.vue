<template>
  <div>
    <v-autocomplete
      :items="codes"
      :label="label"
      outline
      :required="required"
      v-model="reference"
      :rules="[rules.required]"
      @change="changeValue"
      :hint="hint"
      :multiple="parseInt(max) > 1"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <p>No matches found.</p>

            <v-btn
              class="font-weight-bold primary--text text-uppercase"
              text
              depressed
              @click.stop="showAddAnotherForm"
            >
              Add Another
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-dialog v-model="dialog" width="500" max-width="500">
      <v-card>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text>
          <Alert ref="referenceModalAlert" />
          <DynamicForm
            :fields="fields"
            :name="name"
            ref="referenceModalForm"
            :key="name + 'reference-modal'"
            v-on:cancel="cancel"
            v-on:successfulSubmit="submit"
            v-on:failedSubmit="showFailedSubmit"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
    Alert,
    DynamicForm: () => import("./DynamicForm.vue")
  },
  created() {
    this.config = require("@/config/config.json");
    let structureDefinition = this.structureDefinition.slice(
      this.structureDefinition.lastIndexOf("/") + 1
    );

    this.name = structureDefinition;

    axios
      .get(
        this.config.backend + "/structure-definition/all/" + structureDefinition
      )
      .then(response => {
        let options = [];

        response.data.forEach(data => {
          if (data) {
            // figure out what field we want to use, usually name or text
            let description = this.getText(data.resource);
            let value = {
              reference: structureDefinition + "/" + data.resource.id
            };

            options.push({
              text: description,
              value: value
            });
          }
        });

        this.codes = options;
        this.reference = this.value;
      });

    this.describe(structureDefinition).then(response => {
      this.fields = response.fields;
    });
  },
  data() {
    return {
      codes: [],
      config: null,
      dialog: false,
      fields: [],
      modalAlert: false,
      name: null,
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
    cancel() {
      this.dialog = false;
      this.modalAlert = false;
      this.$refs.referenceModalForm.reset();
    },
    changeValue(value) {
      this.reference = value;
    },
    getInput() {
      return this["reference"];
    },
    getText(data) {
      if (data.name) {
        return data.name;
      } else if (data.text) {
        return data.text;
      }

      return data.id;
    },
    showAddAnotherForm() {
      this.dialog = true;
    },
    showFailedSubmit() {
      this.$refs.referenceModalAlert.changeMessage("Data not saved. ", "error");
      this.modalAlert = true;
    },
    submit() {
      let input = this.$refs.referenceModalForm.getInputs();
      input.resourceType = this.name;

      axios
        .post(this.config.backend + "/structure-definition/add", input)
        .then(response => {
          if (response.status == 201) {
            this.modalAlert = false;
            this.dialog = false;
            let value = {
              reference: this.name + "/" + response.data.id
            };

            let option = {
              text: this.getText(response.data),
              value: value
            };

            this.codes.splice(this.codes.length - 1, 0, option);
            this.reference = value;
          } else {
            this.showFailedSubmit();
          }
        });
    }
  },
  mixins: [StructureDefinition],
  props: ["label", "required", "value", "hint", "max", "structureDefinition"]
};
</script>
