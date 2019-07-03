<template>
  <v-text-field
    v-model="canonical"
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
      canonical: null,
      rules: {
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
      return this["canonical"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
