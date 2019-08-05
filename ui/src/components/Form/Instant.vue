<template>
  <v-text-field
    v-if="parseInt(max) <= 1"
    v-model="instant"
    :label="label"
    outline
    :required="required"
    :rules="[rules.instant, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="instant"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.instant, rules.max, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.instant = this.value;
  },
  data() {
    return {
      instant: null,
      rules: {
        instant: value => {
          const pattern = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be of the format YYYY-MM-DDThh:mm:ss.sss+zz:zz (e.g. 2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z).";
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
      return this["instant"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
