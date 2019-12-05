<template>
  <v-text-field
    v-model="integer"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.integer, rules.required]"
    :value="value"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="integer"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.integer, rules.max, rules.required]"
    :required="required"
    outline
    :hint="hint"
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
            if (parseInt(value[i]) != value[i]) {
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
          if (!this.required || value) {
            return true;
          }

          return "Field is required";
        }
      }
    };
  },
  methods: {
    getInput() {
      return this["integer"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
