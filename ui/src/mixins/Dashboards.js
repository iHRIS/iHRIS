import axios from "axios";

import ConfigSettings from "@/mixins/ConfigSettings.js";
import Dashboard from "@/components/Layout/Dashboard.vue";

export default {
  components: {
    Dashboard
  },
  data() {
    return {
      dashboards: []
    };
  },
  methods: {
    addDashboard(dashboard) {
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
          throw "Could not get all dashboards.";
        });
    },
    loadAllDashboards() {
      axios
        .get(this.getBackendUrl() + "/dashboard/all")
        .then(response => {
          if (response.data.saved_objects.length === 0) {
            this.$refs.alert.changeMessage("No dashboards found.", "error");
          } else {
            for (var i in response.data.saved_objects) {
              let dashboard = response.data.saved_objects[i];

              dashboard.iframeLink =
                this.getKibanaLink() +
                "/app/kibana#/dashboard/" +
                dashboard.id +
                "?embed=true";

              this.dashboards.push(dashboard);
            }
          }
        })
        .catch(() => {
          throw "Could not get dashboard.";
        });
    }
  },
  mixins: [ConfigSettings]
};
