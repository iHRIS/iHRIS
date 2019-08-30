<template>
  <v-select
    :items="codes"
    :label="label"
    outline
    :required="required"
    :value="value"
    :v-model="code"
    :rules="[rules.required, rules.whitespace]"
    @change="changeValue"
  ></v-select>
</template>

<script>
export default {
  created() {
    this.code = this.value;
  },
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
          return (
            pattern.test(value) ||
            "Must not have leading or trailing whitespace and must not have whitespace other than single spaces in the contents."
          );
        }
      }
    };
  },
  methods: {
    changeValue(value) {
      this.code = value;
    },
    getInput() {
      return this["code"];
    }
  },
  props: ["codes", "label", "required", "value"]
};
</script>
