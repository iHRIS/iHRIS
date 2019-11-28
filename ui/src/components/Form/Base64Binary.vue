<template>
  <v-text-field
    v-model="base64binary"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.base64Binary, rules.required]"
    :value="value"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="base64binary"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.base64Binary, rules.max, rules.required]"
    :required="required"
    outline
    :hint="hint"
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.base64binary = this.value;
  },
  data() {
    return {
      base64binary: null,
      rules: {
        base64Binary: value => {
          const pattern = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be base 64 binary.";
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
      return this["base64binary"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
