<template>
  <v-checkbox :label="label" :value="checked" v-model="boolean"></v-checkbox>
</template>

<script>
export default {
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
  props: ["checked", "label"]
};
</script>
