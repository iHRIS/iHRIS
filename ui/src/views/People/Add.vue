<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <h1>Add a Person</h1>
      <p>
        To track a person in the database, whether an employee or a job
        applicant, add a record for that person. Certain information is required
        to start a new record. Once the record is generated, additional options
        for adding data about the person will become available. An HR Staff
        person or an HR Manager can add a new person to the system.
      </p>

      <v-alert v-model="alert" dismissable type="error">
        {{ error }}
      </v-alert>

      <DynamicForm
        :fields="fields"
        :key="dynamicFormKey"
        v-on:cancel="cancel"
        v-on:successfulSubmit="submit"
        v-on:failedSubmit="showFailedSubmit"
        v-show="addPractitionerForm"
        ref="addPractitionerForm"
      />
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  created() {
    this.config = require("@/config/config.json");
    axios
      .get(this.config.backend + "/practitioner/describe/page")
      .then(pageResponse => {
        let fields = [];

        const resource = pageResponse.data.subject.reference;

        pageResponse.data.extension[0].extension.forEach(field => {
          if (field.valueString) {
            let name =
              field.valueString.indexOf(".") > 0
                ? field.valueString.slice(field.valueString.indexOf(".") + 1)
                : field.valueString;

            let parent =
              field.valueString.indexOf(".") > 0
                ? field.valueString.slice(0, field.valueString.indexOf("."))
                : null;

            fields.push({
              id: field.valueString,
              max: 1,
              required: false,
              name: name,
              parent
            });
          }
        });

        axios
          .get(
            this.config.backend +
              "/practitioner/describe/definition/" +
              resource.replace(/StructureDefinition\//, "")
          )
          .then(definitionResponse => {
            // this page sets the required properties
            definitionResponse.data.differential.element.forEach(field => {
              let cleanFieldId = field.id.replace(/Practitioner\./, "");

              fields.find(value => {
                let cleanMatchValue =
                  value.id.indexOf(".") > 0
                    ? value.id.slice(0, value.id.indexOf("."))
                    : value.id;

                if (cleanFieldId === cleanMatchValue) {
                  value.required = field.min != 0;
                }

                if (field.max) {
                  value.max = field.max;
                }
              });
            });

            // need to get the base definition
            axios
              .get(
                this.config.backend +
                  "/practitioner/describe/definition/" +
                  definitionResponse.data.name
              )
              .then(structureDefinitionResponse => {
                let promises = [];

                // get the fields from the definition
                fields.forEach(field => {
                  if (field.id.indexOf(".") >= 0) {
                    let baseField = field.id.slice(0, field.id.indexOf("."));
                    let matchingField = structureDefinitionResponse.data.snapshot.element.find(
                      structureDefinition =>
                        structureDefinition.id ==
                        definitionResponse.data.name + "." + baseField
                    );

                    if (!promises[baseField]) {
                      promises[baseField] = axios
                        .get(
                          this.config.backend +
                            "/practitioner/describe/definition/" +
                            matchingField.type[0].code
                        )
                        .then(subdefinitionResponse => {
                          // get all fields matching this subdefinition
                          let matches = fields.filter(
                            match => match.id.indexOf(baseField) >= 0
                          );

                          matches.forEach(subfield => {
                            let name = subfield.id.slice(baseField.length + 1);
                            let submatchingField = subdefinitionResponse.data.snapshot.element.find(
                              structureDefinition =>
                                structureDefinition.id ==
                                matchingField.type[0].code + "." + name
                            );

                            subfield.description = submatchingField.definition;
                            subfield.type = submatchingField.type[0].code;
                            subfield.max = submatchingField.max;

                            if (submatchingField.short.indexOf("|") >= 0) {
                              subfield.options = submatchingField.short
                                .split("|")
                                .map(
                                  Function.prototype.call,
                                  String.prototype.trim
                                );
                            }
                          });

                          this.fields = fields;
                          this.dynamicFormKey++;
                          return Promise.resolve();
                        });
                    }
                  } else {
                    let matchingField = structureDefinitionResponse.data.snapshot.element.find(
                      structureDefinition =>
                        structureDefinition.id ==
                        definitionResponse.data.name + "." + field.id
                    );

                    field.description = matchingField.definition;
                    field.type = matchingField.type[0].code;
                    field.max = matchingField.max;

                    if (matchingField.short.indexOf("|") >= 0) {
                      field.options = matchingField.split("|");
                    }
                  }
                });

                if (promises) {
                  Promise.all(promises).then(result => {
                    this.fields = fields;
                    this.dynamicFormKey++;
                    this.results = result;
                  });
                } else {
                  this.fields = fields;
                  this.dynamicFormKey++;
                }
              });
          });
      })
      .catch(error => {
        this.error = error.response.data;
        this.alert = true;
        this.addPractitionerForm = false;
      });
  },
  components: {
    DynamicForm
  },
  data() {
    return {
      addPractitionerForm: true,
      alert: false,
      config: null,
      dynamicFormKey: 0,
      error: "",
      fields: [],
      inputs: [
        "firstName",
        "surname",
        "otherNames",
        "nationality",
        "residence"
      ],
      practitioner: {},
      results: {},
      rules: [v => !!v || "Required field"],
      surname: ""
    };
  },
  methods: {
    cancel() {
      this.$refs.addPractitionerForm.reset();
    },
    showFailedSubmit() {
      this.error = "Invalid input, please correct all errors.";
      this.alert = true;
    },
    submit(input) {
      let data = {};

      this.fields.forEach(field => {
        if (!field.parent) {
          data[field.name] = input[field.name];
        } else if (!data[field.parent]) {
          data[field.parent] = {};
          data[field.parent][field.name] = input[field.name];
        } else {
          data[field.parent][field.name] = input[field.name];
        }
      });

      axios
        .post(this.config.backend + "/practitioner/add", data)
        .then(response => {
          if (response.status === 201) {
            this.$router.push({
              name: "people-edit",
              params: {
                id: response.data.id
              }
            });
          } else {
            this.error = "There was an error saving this data.";
            this.alert = true;
          }
        })
        .catch(error => {
          this.error = "Data not saved." + error;
          this.alert = true;
        });
    }
  }
};
</script>
