<template>
  <div class="ihris-section" >
    <v-alert
      prominent
      border="top"
      :type="alertType"
      colored-border
      elevation="2"
    >
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "ihris-section",
  props: ["type", "text"],
  computed: {
    alertType() {
      if(this.type) {
        return this.type
      }
      return "info"
    }
  },
}
</script>
