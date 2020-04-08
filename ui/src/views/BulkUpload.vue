<template>
  <v-container>
    <v-card>
      <v-card-title>Bulk Upload</v-card-title>
      <v-card-text>
        Please use the form below to upload multiple instances of the provided structure definition.

        <v-form ref="form">
          How is your file formatted?

          <v-radio-group row v-model="fileType" :rules="[rules.required]">
            <v-radio label="CSV" value="csv"></v-radio>
            <v-radio label="JSON" value="json"></v-radio>
          </v-radio-group>

          Which structure definition are you uploading content to?

          <v-text-field
            v-model="structureDefinition"
            label="Structure Definition"
            :rules="[rules.required]"
          ></v-text-field>

          Please select the file to upload.

          <v-file-input :accept="allowedFileExtension" :rules="[rules.required]" label="File" :disabled="!validFileType"></v-file-input>

          <v-layout align-center justify-end fill-height>
            <v-btn class="primary">Upload</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

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
    validFileType() {
      return this.fileType === "csv" || this.fileType === "json"
    }
  },
  data() {
    return {
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
      structureDefinition: ""
    }
  }
}
</script>
