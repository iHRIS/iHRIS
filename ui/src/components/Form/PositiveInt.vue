<template>
  <v-text-field
    v-model="positiveInt"
    :label="label"
    outline
    :required="required"
    :rules="[rules.inRange, rules.integer, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        inRange: value => {
          if (value < 1) {
            return "Value must be greater than 1.";
          }

          if (value > 2147483647) {
            return "Value must be less than 2147483647.";
          }

          return true;
        },
        integer: value => {
          return Number.isInteger(value) || "Value must be an integer";
        },
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      }
    };
  },
  props: ["label", "required", "value"]
};
</script>
