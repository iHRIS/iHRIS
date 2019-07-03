<template>
  <v-text-field
    v-model="unsignedInt"
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
          if (value < 0) {
            return "Value must be greater than 0.";
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
      },
      unsignedInt: null
    };
  },
  methods: {
    getInput() {
      return this["unsignedInt"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
