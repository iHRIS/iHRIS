<template>
  <v-card 
    class="mx-auto"
    max-width="700"
    outlined
    >
    <v-card-title class="primary white--text text-uppercase font-weight-bold">{{ label }}</v-card-title>
    <v-card-text class="my-3">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ihris-questionnaire-group",
  props: ["label", "path"],
  data: function() {
    return {
    }
  }
}
</script>
