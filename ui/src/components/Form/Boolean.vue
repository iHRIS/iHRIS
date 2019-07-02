<template>
  <v-checkbox :label="label" :value="checked"></v-checkbox>
</template>

<script>
export default {
  props: ["checked", "label"]
};
</script>
