<template>
  <v-container>
    <v-card>
      <v-card-title>Bulk Upload</v-card-title>
      <v-card-text>
        <Alert ref="alertBanner" v-if="showAlert" />

        Please use the form below to upload multiple instances of the provided
        structure definition.

        <v-form ref="form">
          How is your file formatted?

          <v-radio-group
            row
            v-model="fileType"
            :rules="[rules.fileType]"
            id="file-type"
          >
            <v-radio label="CSV" value="csv"></v-radio>
            <v-radio label="JSON" value="json"></v-radio>
          </v-radio-group>

          <div v-if="fileType !== ''" id="instructions" class="pb-10">
            <p class="title">Upload instructions</p>

            <p v-html="uploadInstructions"></p>

            <v-dialog
              v-model="dialog"
              width="400"
              id="json-dialog"
              v-if="fileType !== ''"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2" dark v-on="on">
                  See example
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  {{ dialogTitle }}
                </v-card-title>

                <v-card-text v-html="dialogText"> </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <div v-if="fileType === 'json'" id="structure-definition-field">
            Which structure definition are you uploading content to?

            <v-autocomplete
              :no-data-text="noStructureDefinitions"
              v-model="structureDefinition"
              label="Structure Definition"
              :items="structureDefinitions"
              :rules="[rules.structureDefinition]"
              :loading="hasStructureDefinitions"
              outlined
            >
            </v-autocomplete>
          </div>

          <div v-if="fileType === 'csv'" id="questionnaire-field">
            <v-autocomplete
              :no-data-text="noQuestionnaires"
              v-model="questionnaire"
              label="Questionnaire"
              :items="questionnaires"
              :rules="[rules.questionnaire]"
              :loading="hasQuestionnaires"
              outlined
            >
            </v-autocomplete>
          </div>

          <div v-if="fileType !== ''" id="file-upload">
            <p>Please select the file to upload.</p>

            <v-file-input
              outlined
              v-model="filePath"
              :accept="allowedFileExtension"
              :rules="[rules.file, rules.fileIsLoaded]"
              label="File"
              :disabled="!validFileType"
              :loading="fileUploadStatus"
              @change="uploadFile"
            ></v-file-input>
          </div>

          <div v-if="fileType === 'json'" id="json-blob">
            <p>or, copy / paste the json into the box below.</p>

            <v-textarea
              outlined
              v-model="jsonBlob"
              label="JSON file"
              :rules="[rules.jsonBlob]"
            ></v-textarea>
          </div>

          <v-layout align-center justify-end fill-height>
            <div id="upload-button">
              <v-btn class="primary" :loading="loading" @click="validateAndSend">Upload</v-btn>
            </div>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  components: {
    Alert
  },
  computed: {
    allowedFileExtension() {
      if (this.fileType === "csv") {
        return ".csv";
      }

      if (this.fileType === "json") {
        return ".json";
      }

      return ".invalid";
    },
    dialogText() {
      let formattedText = "";

      if (this.fileType === "csv") {
        formattedText += "1.1.1,1.1.2,1.1.3,1.1.4<br>";
        formattedText += "Yes,No,Yes,Yes<br>";
        formattedText += "No,Yes,No,No<br>";
        formattedText += "Yes,Yes,Yes,Yes<br>";
        return formattedText;
      }

      if (this.fileType === "json") {
        formattedText += "<code>";
        formattedText += "<pre>";
        formattedText += "[\n";
        formattedText += "  {\n";
        formattedText += "    active: true,\n";
        formattedText += "    name: [\n";
        formattedText += "      {\n";
        formattedText += '        use: "official",\n';
        formattedText += '        family: "Theuoumiogo",\n';
        formattedText += '        given: [ "Drou" ]\n';
        formattedText += "      }\n";
        formattedText += "    ]\n";
        formattedText += "  }, {\n";
        formattedText += "    active: true,\n";
        formattedText += "    name: [\n";
        formattedText += "      {\n";
        formattedText += '        use: "official",\n';
        formattedText += '        family: "Thoguji",\n';
        formattedText += '        given: [ "Woucra" ]\n';
        formattedText += "      }\n";
        formattedText += "    ]\n";
        formattedText += "  }, {\n";
        formattedText += "    active: true,\n";
        formattedText += "    name: [\n";
        formattedText += "      {\n";
        formattedText += '        use: "official",\n';
        formattedText += '        family: "Pristaicloga",\n';
        formattedText += '        given: [ "Slaetr" ]\n';
        formattedText += "      }\n";
        formattedText += "    ]\n";
        formattedText += "  }\n";
        formattedText += "]\n";
        formattedText += "</pre>";
        formattedText += "</code>";
        return formattedText;
      }

      return formattedText;
    },
    dialogTitle() {
      if (this.fileType === "csv") {
        return "CSV example";
      }

      if (this.fileType === "json") {
        return "JSON example - Practitioner";
      }

      return "";
    },
    fileUploadStatus() {
      if (!this.upload) {
        return false;
      }

      return "primary";
    },
    hasQuestionnaires() {
      if (this.downloadedQuestionnaires) {
        return false;
      }

      return "primary";
    },
    hasStructureDefinitions() {
      if (this.downloadedStructureDefinitions) {
        return false;
      }

      return "primary";
    },
    noQuestionnaires() {
      if (this.downloadedQuestionnaires) {
        return "No questionnaires were found.";
      }

      return "Questionnaires are still being loaded.";
    },
    noStructureDefinitions() {
      if (this.downloadedStructureDefinitions) {
        return "No structure definitions were found.";
      }

      return "Structure definitions are still being loaded.";
    },
    uploadInstructions() {
      if (this.fileType === "csv") {
        return 'Please upload a csv formatted file. In order to map your csv to FHIR resources, you will need to create a <a href="https://www.hl7.org/fhir/questionnaire.html" target="_blank">FHIR Questionnaire</a>.<br><br>Once you have created your questionnaire, the first line of the csv should contain ids corresponding to questions in the questionnaire. Each subsequent line will contain a response to the questionnaire.';
      }

      if (this.fileType === "json") {
        return 'Please upload a valid json formatted file. Please refer to this <a href="https://jsonformatter.curiousconcept.com/" target="_blank">JSON formatter</a>to validate your json file. Your file should be an array of records formatted according to your structure definition.';
      }

      return "";
    },
    validFileType() {
      return this.fileType === "csv" || this.fileType === "json";
    }
  },
  created() {
    this.created();
  },
  data() {
    return {
      dialog: false,
      downloadedQuestionnaires: false,
      downloadedStructureDefinitions: false,
      fileData: null,
      filePath: null,
      fileType: "",
      jsonBlob: "",
      loading: false,
      questionnaire: "",
      questionnaires: [],
      rules: {
        file: value => {
          if (value) {
            return true;
          }

          // if json, blob is okay instead
          if (this.fileType === "json" && this.jsonBlob !== "") {
            return true;
          }

          return "Please select a file to upload.";
        },
        fileIsLoaded: () => {
          // first, check that a file has been attached
          // if that hasn't happened yet, we haven't hit this validation step
          if (!this.filePath) {
            return true;
          }

          if (this.fileData) {
            return true;
          }

          return "Please wait for file to finish uploading.";
        },
        fileType: value => {
          if (value) {
            return true;
          }

          return "Please select how your file is formatted.";
        },
        jsonBlob: value => {
          if (value) {
            return true;
          }

          // if a csv upload, this isn't needed
          if (this.fileType === "csv") {
            return true;
          }

          // if we have a file upload, this isn't needed
          if (this.filePath) {
            return true;
          }

          return "Please either copy / paste your json data or upload a file.";
        },
        questionnaire: value => {
          if (value) {
            return true;
          }

          // if not csv file type, then nothing to validate
          if (this.fileType !== "csv") {
            return true;
          }

          return "Please select the questionnaire for this file.";
        },
        structureDefinition: value => {
          if (value) {
            return true;
          }

          // if not json file type, then nothing to validate
          if (this.fileType !== "json") {
            return true;
          }

          return "Please select which structure definition you are updating.";
        }
      },
      showAlert: false,
      structureDefinition: "",
      structureDefinitions: [],
      upload: false
    };
  },
  methods: {
    created() {
      this.loadQuestionnaires();
      this.loadStructureDefinitions();
    },
    formatData() {
      if (this.fileType === "csv") {
        // only option here is file upload
        if (!this.fileData) {
          return false;
        }

        let responses = [];
        let file = this.fileData.split("\n");

        // first line should be the header
        let header = file[0].split(",");

        for (let i = 1; i < file.length; i++) {
          if (file[i] === "") {
            continue;
          }

          let line = file[i].split(",");
          let response = {};

          for (let j = 0; j < header.length; j++) {
            response[header[j]] = line[j];
          }

          responses.push(response);
        }

        return {
          questionnaire: this.questionnaire,
          responses: responses
        };
      } else if (this.fileType === "json") {
        let data;

        // data can come from one of two places:
        // use blob if something is there
        if (this.jsonBlob) {
          data = this.jsonBlob;
        } else if (this.fileData) {
          data = this.fileData;
        } else {
          return false;
        }

        return {
          bundle: data,
          definition: this.structureDefinition
        };
      } else {
        return false;
      }
    },
    formIsValid() {
      return this.$refs.form.validate();
    },
    loadQuestionnaires() {
      axios
        .get(this.getBackendUrl() + "/structure-definition/all/Questionnaire")
        .then(response => {
          let text = "";

          response.data.forEach(questionnaire => {
            if (questionnaire.resource.name) {
              text = questionnaire.resource.name;
            } else if (questionnaire.resource.title) {
              text = questionnaire.resource.title;
            } else {
              text = questionnaire.resource.id;
            }

            this.questionnaires.push({
              text: text,
              value: questionnaire.resource.id
            });
          });

          this.downloadedQuestionnaires = true;
        })
        .catch(() => {
          this.downloadedQuestionnaires = true;
        });
    },
    loadStructureDefinitions() {
      axios
        .get(this.getBackendUrl() + "/structure-definition/valid")
        .then(response => {
          let structureDefinitions = response.data;
          structureDefinitions.sort();

          structureDefinitions.forEach(structureDefinition => {
            this.structureDefinitions.push({
              text: structureDefinition,
              value: structureDefinition
            });
          });

          this.downloadedStructureDefintions = true;
        })
        .catch(() => {
          this.downloadedStructureDefintions = true;
        });
    },
    submit() {
      this.showAlert = false;

      let data = this.formatData();
      let route = this.uploadRoute();

      if (!data) {
        return false;
      }

      if (!route) {
        return false;
      }

      return axios
        .post(route, data)
        .then(response => {
          this.showAlert = true;
          this.$refs.alertBanner.changeMessage(
            response.data.count + " new records added.",
            "success"
          );

          this.loading = false;

          return true;
        })
        .catch(() => {
          this.showAlert = true;
          this.$refs.alertBanner.changeMessage(
            "There was an error uploading these records.",
            "error"
          );

          this.loading = false;

          return false;
        });
    },
    uploadFile() {
      this.upload = true;

      let fileReader = new FileReader();
      fileReader.readAsText(this.filePath);
      fileReader.onload = () => {
        this.fileData = fileReader.result;
        this.upload = false;

        // this is necessary because it can trigger an error that will not go away
        this.$refs.form.resetValidation();
      };
    },
    uploadRoute() {
      if (this.fileType === "csv") {
        return this.getBackendUrl() + "/questionnaire/respond";
      }

      if (this.fileType === "json") {
        return this.getBackendUrl() + "/structure-definition/upload";
      }

      return false;
    },
    validateAndSend() {
      this.loading = true;

      if (this.formIsValid()) {
        let result = this.submit();

        if (!result) {
          this.loading = false;
        }

        return result;
      }

      this.loading = false;
      return false;
    }
  },
  mixins: [ConfigSettings]
};
</script>
