<template>
  <v-text-field
    v-model="positiveInt"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.inRange, rules.integer, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="positiveInt"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.inRange, rules.integer, rules.max, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.positiveInt = this.value;
  },
  data() {
    return {
      positiveInt: null,
      rules: {
        inRange: value => {
          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (value[i] < 1) {
              return "Value must be greater than 1.";
            }

            if (value[i] > 2147483647) {
              return "Value must be less than 2147483647.";
            }
          }

          return true;
        },
        integer: value => {
          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!Number.isInteger(value[i])) {
              return "Value must be an integer";
            }
          }

          return true;
        },
        max: value => {
          if (this.max == "*") {
            return true;
          }

          let max = parseInt(this.max);

          if (value.length > max) {
            return "Only " + max + " entries allowed.";
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
      return this["positiveInt"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
