<template>
  <v-container>
    <v-card>
      <v-card-title>Bulk Upload</v-card-title>
      <v-card-text>
        Please use the form below to upload multiple instances of the provided
        structure definition.

        <v-form ref="form">
          How is your file formatted?

          <v-radio-group row v-model="fileType" :rules="[rules.required]">
            <v-radio label="CSV" value="csv"></v-radio>
            <v-radio label="JSON" value="json"></v-radio>
          </v-radio-group>

          Which structure definition are you uploading content to?

          <v-autocomplete
            v-model="structureDefinition"
            label="Structure Definition"
            :items="structureDefinitions"
            :rules="[rules.required]"
            :loading="hasStructureDefinitions"
            outlined
          >
          </v-autocomplete>

          <div v-if="fileType === 'json'" id="json-instructions" class="pb-10">
            <p class="title">Upload instructions</p>

            <p>
              Please upload a valid json formatted file. Please refer to this
              <a
                href="https://jsonformatter.curiousconcept.com/"
                target="_blank"
                >JSON formatter</a
              >
              to validate your json file. Your file should be an array of
              records formatted according to your structure definition.
            </p>

            <v-dialog v-model="dialog" width="400" id="json-dialog">
              <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2" dark v-on="on">
                  See example
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  JSON example - Practitioner
                </v-card-title>

                <v-card-text>
                  <code>
                    <pre>
[
  {
    "active": true,
    "name": [
      {
        "use": "official",
        "family": "Theuoumiogo",
        "given": [ "Drou" ]
      }
    ]
  }, {
    "active": true,
    "name": [
      {
        "use": "official",
        "family": "Thoguji",
        "given": [ "Woucra" ]
      }
    ]
  }, {
    "active": true,
    "name": [
      {
        "use": "official",
        "family": "Pristaicloga",
        "given": [ "Slaetr" ]
      }
    ]
  }
]
                  </pre
                    >
                  </code>
                </v-card-text>

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

          <p>Please select the file to upload.</p>

          <v-file-input
            outlined
            :accept="allowedFileExtension"
            :rules="[rules.required]"
            label="File"
            :disabled="!validFileType"
          ></v-file-input>

          <v-layout align-center justify-end fill-height>
            <v-btn class="primary">Upload</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
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
    hasStructureDefinitions() {
      if (this.structureDefinitions.length) {
        return false;
      }

      return "primary";
    },
    validFileType() {
      return this.fileType === "csv" || this.fileType === "json";
    }
  },
  created() {
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
      });
  },
  data() {
    return {
      dialog: false,
      file: "",
      fileType: "",
      rules: {
        required: value => {
          if (value) {
            return true;
          }

          return "Field is required";
        }
      },
      structureDefinition: "",
      structureDefinitions: []
    };
  },
  mixins: [ConfigSettings]
};
</script>
