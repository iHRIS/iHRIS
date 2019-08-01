<template>
  <v-text-field
    v-model="integer"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.integer, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="integer"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.integer, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.integer = this.value;
  },
  data() {
    return {
      integer: null,
      rules: {
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
      return this["integer"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
