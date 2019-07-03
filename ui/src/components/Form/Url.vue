<template>
  <v-text-field
    v-model="url"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
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
        }
      },
      url: null
    };
  },
  methods: {
    getInput() {
      return this["url"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
