<template>
  <div :id="'section-'+id" class="ihris-section">
    <v-card 
      class="mx-auto"
      max-width="700"
      outlined
      >
      <v-card-title class="primary darken-1 white--text text-uppercase font-weight-bold">{{ label }}</v-card-title>
      <v-card-text class="my-3">
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ihris-questionnaire-section",
  props: ["id", "label", "description", "path"],
  data: function() {
    return {
      isQuestionnaireGroup: true
    }
  }
}
</script>
