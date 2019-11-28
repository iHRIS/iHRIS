<template>
  <v-text-field
    v-model="url"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="url"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.max, rules.required]"
    :required="required"
    outline
    :hint="hint"
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.url = this.value;
  },
  data() {
    return {
      rules: {
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
      },
      url: null
    };
  },
  methods: {
    getInput() {
      return this["url"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
