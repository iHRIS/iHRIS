<template>
  <v-text-field
    v-model="integer"
    :label="label"
    outline
    :required="required"
    :rules="[rules.integer, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      integer: null,
      rules: {
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
  methods: {
    getInput() {
      return this["integer"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
