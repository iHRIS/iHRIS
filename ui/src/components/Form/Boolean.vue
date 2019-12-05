<template>
  <v-checkbox
    :label="label"
    :value="value"
    v-model="boolean"
    :hint="hint"
  ></v-checkbox>
</template>

<script>
export default {
  created() {
    this.boolean = this.value;
  },
  data() {
    return {
      boolean: false
    };
  },
  methods: {
    getInput() {
      return this["boolean"];
    }
  },
  props: ["value", "label", "hint"]
};
</script>
