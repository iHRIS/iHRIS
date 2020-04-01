<template>
  <v-container>
    <Alert ref="alert" v-show="alert" />

    <Dashboard :dashboards="dashboards" ref="dashboard" />
  </v-container>
</template>

<script>
import Alert from "@/components/Layout/Alert.vue";
import ConfigSettings from "@/mixins/ConfigSettings.js";
import Dashboards from "@/mixins/Dashboards.js";

export default {
  components: {
    Alert
  },
  created() {
    let dashboards = this.getDashboards();

    if (!dashboards.length) {
      this.loadAllDashboards().catch(() => {
        this.$refs.dashboard.setError(
          "Could not retrieve dashboards.",
          "error"
        );
      });
    } else {
      dashboards.forEach(dashboard => {
        this.addDashboard(dashboard).catch(() => {
          this.$refs.dashboard.setError(
            "Could not retrieve dashboards.",
            "error"
          );
        });
      });
    }
  },
  data() {
    return {
      alert: false,
      dashboards: []
    };
  },
  mounted() {
    if (this.login) {
      this.$refs.alert.changeMessage("Login successful", "success");
      this.alert = true;
    }
  },
  props: {
    login: {
      default: false,
      type: Boolean
    }
  },
  mixins: [ConfigSettings, Dashboards]
};
</script>
