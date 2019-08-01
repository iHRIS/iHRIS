<template>
  <v-text-field
    v-model="canonical"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="canonical"
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
    this.canonical = this.value;
  },
  data() {
    return {
      canonical: null,
      rules: {
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
      return this["canonical"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
