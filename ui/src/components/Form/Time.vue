<template>
  <v-text-field
    v-model="time"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.required, rules.time]"
    :value="value"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="time"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.max, rules.required, rules.time]"
    :required="required"
    outline
    :hint="hint"
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.time = this.value;
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
        },
        time: value => {
          const pattern = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be hh:mm:ss";
            }
          }

          return true;
        }
      },
      time: null
    };
  },
  methods: {
    getInput() {
      return this["time"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
