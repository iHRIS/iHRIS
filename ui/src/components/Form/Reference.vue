<template>
  <div>
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
      :multiple="parseInt(max) > 1"
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
            @click.stop="showAddAnotherForm"
          >
            Add Another
          </v-btn>
        </template>
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

import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
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

        // this is an empty option to allow for the creation of new reference items
        options.push({
          text: null,
          value: null
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
