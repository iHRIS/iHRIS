<template>
  <v-text-field
    v-model="datetime"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.datetime, rules.required]"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="datetime"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.datetime, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.datetime = this.value;
  },
  data() {
    return {
      datetime: null,
      rules: {
        datetime: value => {
          const pattern = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz";
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
      return this["datetime"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
