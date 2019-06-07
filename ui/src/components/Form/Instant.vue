<template>
  <v-text-field
    v-model="instant"
    :label="label"
    outline
    :required="required"
    :rules="[rules.instant, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        instant: value => {
          const pattern = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;
          return (
            pattern.test(value) ||
            "Must be of the format YYYY-MM-DDThh:mm:ss.sss+zz:zz (e.g. 2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z)."
          );
        },
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      }
    };
  },
  props: ["label", "required", "value"]
};
</script>
