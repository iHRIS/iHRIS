<template>
  <v-container>
    <Dashboard :dashboards="dashboards" ref="dashboard" />
  </v-container>
</template>

<script>
import axios from "axios";

import ConfigSettings from "@/mixins/ConfigSettings.js";
import Dashboard from "@/components/Layout/Dashboard.vue";

export default {
  components: {
    Dashboard
  },
  created() {
    let dashboards = this.getMHeroDashboards();

    dashboards.forEach(dashboard => {
      axios
        .get(this.getBackendUrl() + "/dashboard/n/" + dashboard)
        .then(response => {

          for (var i in response.data.saved_objects) {
            let dashboard = response.data.saved_objects[i];
            dashboard.iframeLink =
              this.getKibanaLink() +
              "/app/kibana#/dashboard/" +
              dashboard.id +
              "?embed=true";

            this.dashboards.push(dashboard);
          }
        })
        .catch(() => {
          this.$refs.dashboard.setError(
            "Could not retrieve dashboards.",
            "error"
          );
        });
    });
  },
  data() {
    return {
      dashboards: []
    };
  },
  mixins: [ConfigSettings]
};
</script>
