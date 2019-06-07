<template>
  <v-text-field
    v-model="base64binary"
    :label="label"
    outline
    :required="required"
    :rules="[rules.base64Binary, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        base64Binary: value => {
          const pattern = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;
          return pattern.test(value) || "Must be base 64 binary.";
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
