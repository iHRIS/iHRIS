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
          throw "Could not load dashboard: " + dashboard;
        });
    },
    loadAllDashboards() {
      axios
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
        })
        .catch(() => {
          throw "Could not get all dashboards.";
        });
    }
  },
  mixins: [ConfigSettings]
};
