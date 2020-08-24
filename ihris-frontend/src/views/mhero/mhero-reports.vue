<template>
  <v-container>
    <ihrisReport :report='$route.params.report'></ihrisReport>
  </v-container>
</template>
<script>
import ihrisReport from "@/views/es-report";
export default {
  components: {
    ihrisReport: ihrisReport
  }
};
</script>