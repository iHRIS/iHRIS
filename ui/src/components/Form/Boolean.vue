<template>
  <v-checkbox
    :id="setFieldId"
    :label="label"
    :value="checked"
    v-model="boolean"
    :hint="hint"
    @change="runUIValidation"
  ></v-checkbox>
</template>

<script>
import GenerateFieldID from "@/mixins/GenerateFieldID.js";
export default {
  mixins: [GenerateFieldID],
  computed: {
    setFieldId() {
      return this.generateFieldId(this.formName, this.fieldName);
    }
  },
  created() {
    this.boolean = this.value;
  },
  data() {
    return {
      boolean: false
    };
  },
  methods: {
    getInput() {
      return this["boolean"];
    },
    runUIValidation() {
      var validationParams = {
        formName: this.formName,
        fiedlName: this.fieldName,
        value: this.boolean
      };
      this.$emit("validationTriggered", validationParams);
    }
  },
  props: ["checked", "label", "hint", "formName", "fieldName"]
};
</script>
