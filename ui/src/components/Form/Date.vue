<template>
  <v-text-field
    v-model="date"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.date, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="date"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.date, rules.required]"
    :required="required"
    outline
  ></v-combobox>
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

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be YYYY, YYYY-MM, or YYYY-MM-DD";
            }
          }

          return true;
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
  props: ["label", "max", "required", "value"]
};
</script>
