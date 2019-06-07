<template>
  <v-select
    :items="codes"
    label="Outline style"
    outline
    :required="required"
    :value="value"
    :rules="[rules.required, rules.whitespace]"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        },
        whitespace: value => {
          const pattern = /[^\s]+(\s[^\s]+)*/;
          return pattern.test(value) || "Must not have leading or trailing whitespace and must not have whitespace other than single spaces in the contents.";
        }
      }
    };
  },
  props: ["codes", "label", "required", "value"]
};
</script>
