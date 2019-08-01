<template>
  <v-text-field
    v-model="decimal"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.decimal, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="decimal"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.decimal, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.decimal = this.value;
  },
  data() {
    return {
      decimal: null,
      rules: {
        decimal: value => {
          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (value[i] === "") {
              continue;
            }

            if (typeof value[i] !== "number") {
              return "Value must be a decimal";
            }

            if (value[i] !== Number(value[i])) {
              return "Value must be a decimal";
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
      return this["decimal"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
