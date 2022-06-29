<template>
  <v-card 
    class="mx-auto"
    max-width="700"
    elevation="0"
    >
    <v-card-title class=" ml-4 font-weight-bold">{{ $t(`App.ihris-questionnaire-group.${label}`) }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text v-for="(error,idx) in errors" :key="idx" class="error white--text font-weight-bold">{{error}}</v-card-text>
    <v-card-text class="my-3">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ihris-questionnaire-group",
  props: ["label", "path", "constraints"],
  data: function() {
    return {
      isQuestionnaireGroup: true,
      errors: []
    }
  }
}
</script>
