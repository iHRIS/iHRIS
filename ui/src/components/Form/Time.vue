<template>
  <v-text-field
    v-model="time"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.time, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="time"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.time, rules.required]"
    :required="required"
    outline
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
        },
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
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
  props: ["label", "max", "required", "value"]
};
</script>
