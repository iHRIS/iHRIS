<template>
  <v-text-field
    v-model="uri"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  created() {
    this.uri = this.value;
  },
  data() {
    return {
      rules: {
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      },
      uri: null
    };
  },
  methods: {
    getInput() {
      return this["uri"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
