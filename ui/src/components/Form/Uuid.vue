<template>
  <v-text-field
    v-model="uuid"
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
    v-model="uuid"
    hide-selected
    :label="label"
    multiple
    append-icon=""
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
    this.uuid = this.value;
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
      uuid: null
    };
  },
  methods: {
    getInput() {
      return this["uuid"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
