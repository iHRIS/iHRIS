<template>
  <v-text-field
    v-model="time"
    :label="label"
    outline
    :required="required"
    :rules="[rules.time, rules.required]"
    :value="value"
  ></v-text-field>
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
          return pattern.test(value) || "Must be hh:mm:ss";
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
  props: ["label", "required", "value"]
};
</script>
