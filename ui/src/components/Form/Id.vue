<template>
  <v-text-field
    v-model="id"
    :label="label"
    outline
    :required="required"
    :rules="[rules.format, rules.length, rules.required]"
  ></v-text-field>
</template>

<script>
export default {
  created() {
    this.id = this.value;
  },
  data() {
    return {
      id: null,
      rules: {
        format: value => {
          const pattern = /[A-Za-z0-9\-.]/;

          return (
            pattern.test(value) ||
            "Must be only upper- or lower-case ASCII letters."
          );
        },
        length: value => {
          if (!value.length) {
            return true;
          }

          return (
            (value.length >= 1 && value.length <= 64) ||
            "Field must be between 1 and 64 characters."
          );
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
      return this["id"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
