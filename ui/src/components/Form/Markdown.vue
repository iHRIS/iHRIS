<template>
  <v-text-field
    v-model="markdown"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.format, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="markdown"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.format, rules.max, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.markdown = this.value;
  },
  data() {
    return {
      markdown: null,
      rules: {
        format: value => {
          const pattern = /\s*(\S|\s)*/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must use markdown syntax.";
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
      return this["markdown"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
