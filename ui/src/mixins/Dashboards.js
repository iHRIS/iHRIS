import axios from "axios";

import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  data() {
    return {
      dashboards: []
    };
  },
  methods: {
    addDashboard(dashboard) {
      return axios
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

          return Promise.resolve({ success: true });
        })
        .catch(() => {
          return Promise.reject({
            success: false,
            message: "Could not load dashboard: " + dashboard
          });
        });
    },
    loadAllDashboards() {
      return axios
        .get(this.getBackendUrl() + "/dashboard/all")
        .then(response => {
          this.dashboards = [];

          if (response.data.saved_objects.length !== 0) {
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

          return Promise.resolve({ success: true });
        })
        .catch(() => {
          return Promise.reject({
            success: false,
            message: "Could not get all dashboards."
          });
        });
    }
  },
  mixins: [ConfigSettings]
};
