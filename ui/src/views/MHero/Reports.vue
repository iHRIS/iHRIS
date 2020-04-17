<template>
  <v-container>
    <Dashboard :dashboards="dashboards" ref="dashboard" />
  </v-container>
</template>

<script>
import ConfigSettings from "@/mixins/ConfigSettings.js";
import Dashboard from "@/components/Layout/Dashboard.vue";
import Dashboards from "@/mixins/Dashboards.js";

export default {
  components: {
    Dashboard
  },
  created() {
    let dashboards = this.getMHeroDashboards();

    dashboards.forEach(dashboard => {
      this.addDashboard(dashboard).catch(() => {
        this.$refs.dashboard.setError(
          "Could not retrieve dashboards.",
          "error"
        );
      });
    });
  },
  mixins: [ConfigSettings, Dashboards]
};
</script>
