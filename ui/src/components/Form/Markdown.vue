<template>
  <v-text-field
    v-model="markdown"
    :label="label"
    outline
    :required="required"
    :rules="[rules.format, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        format: value => {
          const pattern = /\s*(\S|\s)*/;
          return pattern.test(value) || "Must use markdown syntax.";
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
