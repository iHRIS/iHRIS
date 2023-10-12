<template>
  <div :id="'section-'+id" class="ihris-section pb-4">
    <v-card
      class="mx-auto"
      max-width="700"
      outlined
      >
      <v-card-title class=" justify-center darken-1 primary white--text text-uppercase font-weight-bold">{{ $t(`App.fhir-resources-texts.${label}`) }}</v-card-title>
      <v-card-text v-for="(error,idx) in errors" :key="idx" class="error white--text font-weight-bold">{{error}}</v-card-text>
      <v-card-text class="my-3">
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ihris-questionnaire-section",
  props: ["id", "label", "description", "path", "constraints"],
  data: function() {
    return {
      isQuestionnaireGroup: true,
      errors: []
    }
  }
}
</script>
