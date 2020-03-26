<template>
  <div :id="applyFieldId">
    <v-datetime-picker
      :label="label"
      v-model="datetime"
      timePickerFormat="ampm"
      :width="width"
      :format="format"
    ></v-datetime-picker>
  </div>
</template>

<script>
import GenerateFieldID from "@/mixins/GenerateFieldID.js";
export default {
  mixins: [GenerateFieldID],
  computed: {
    applyFieldId() {
      return this.generateFieldId(this.formName, this.fieldName);
    }
  },
  created() {
    this.config = require("@/config/config.json");
    this.locale = this.config.locale;
    this.datetime = this.value;
  },
  data() {
    return {
      datetime: null,
      locale: "en-US",
      format: "YYYY-MM-DDTHH:mm:ssZ",
      width: 290,
      rules: {
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      }
    };
  },
  methods: {
    getInput() {
      return this["datetime"];
    }
  },
  props: ["label", "max", "required", "value", "hint", "formName", "fieldName"]
};
</script>
