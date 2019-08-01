<template>
  <v-text-field
    v-model="uuid"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="uuid"
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
    this.uuid = this.value;
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
      uuid: null
    };
  },
  methods: {
    getInput() {
      return this["uuid"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
