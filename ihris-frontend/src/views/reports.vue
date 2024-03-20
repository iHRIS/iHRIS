<template>
  <v-container>
    <esReport :report='$route.params.report'></esReport>
  </v-container>
</template>
<script>
import esReport from "@/views/es-report";
export default {
  components: {
    esReport: esReport
  }
};
</script>