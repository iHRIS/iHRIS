<template>
  <v-text-field
    v-model="uri"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="uri"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.uri = this.value;
  },
  data() {
    return {
      rules: {
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      },
      uri: null
    };
  },
  methods: {
    getInput() {
      return this["uri"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
