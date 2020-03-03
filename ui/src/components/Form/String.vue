<template>
  <v-text-field
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
    v-model="string"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="string"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    append-icon=""
    :rules="[rules.max, rules.required]"
    :required="required"
    :value="value"
    outline
    :hint="hint"
  ></v-combobox>
</template>

<script>
export default {
  created() {
    if (
      (this.max === "*" || parseInt(this.max) > 1) &&
      !Array.isArray(this.value)
    ) {
      this.string = [this.value];
    } else {
      this.string = this.value;
    }
  },
  data() {
    return {
      rules: {
        max: value => {
          if (this.max == "*") {
            return true;
          }

          let max = parseInt(this.max);

          if (value && value.length > max) {
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
      },
      string: null
    };
  },
  methods: {
    getInput() {
      return this["string"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
