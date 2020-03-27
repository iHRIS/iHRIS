<template>
  <v-container>
    <Alert ref="alert" />

    <v-card
      v-for="dashboard in dashboards"
      v-bind:key="dashboard.id"
      class="mb-5"
    >
      <v-card-title>{{ dashboard.attributes.title }}</v-card-title>
      <v-card-text>
        <iframe :src="dashboard.iframeLink" height="800" width="100%"></iframe>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";
import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  components: {
    Alert
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
              this.config.kibana +
              "/app/kibana#/dashboard/" +
              dashboard.id +
              "?embed=true";

            this.dashboards.push(dashboard);
          }
        })
        .catch(() => {
          this.$refs.alert.changeMessage(
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
