<template>
  <v-text-field
    v-model="decimal"
    :label="label"
    outline
    :required="required"
    :rules="[rules.decimal, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      decimal: null,
      rules: {
        decimal: value => {
          if (value === "") {
            return true;
          }

          if (typeof value !== "number") {
            return "Value must be a decimal";
          }

          if (value !== Number(value)) {
            return "Value must be a decimal";
          }

          return true;
        },
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
      return this["decimal"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
