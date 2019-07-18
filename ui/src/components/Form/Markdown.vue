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
  created() {
    this.markdown = this.value;
  },
  data() {
    return {
      markdown: null,
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
  methods: {
    getInput() {
      return this["markdown"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
