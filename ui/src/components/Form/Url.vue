<template>
  <v-text-field
    v-model="url"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="url"
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
    this.url = this.value;
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
      url: null
    };
  },
  methods: {
    getInput() {
      return this["url"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
