<template>
  <v-select
    :items="codes"
    :label="label"
    outline
    :required="required"
    :value="value"
    :rules="[rules.required, rules.whitespace]"
    v-model="code"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      code: null,
      rules: {
        required: value => {
          if (!this.required || value) {
            return true;
          }
        
          return "Field is required";
        },
        whitespace: value => {
          const pattern = /[^\s]+(\s[^\s]+)*/;
          return pattern.test(value) || "Must not have leading or trailing whitespace and must not have whitespace other than single spaces in the contents.";
        }
      }
    };
  },
  methods: {
    getInput() {
      return this["code"];
    }
  },
  props: ["codes", "label", "required", "value"]
};
</script>
