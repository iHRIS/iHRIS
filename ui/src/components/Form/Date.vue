<template>
  <v-text-field
    v-model="date"
    :label="label"
    outline
    :required="required"
    :rules="[rules.date, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  created() {
    this.date = this.value;
  },
  data() {
    return {
      date: null,
      rules: {
        date: value => {
          const pattern = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
          return pattern.test(value) || "Must be YYYY, YYYY-MM, or YYYY-MM-DD";
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
      return this["date"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
