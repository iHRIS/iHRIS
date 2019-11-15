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

export default {
  components: {
    Alert
  },
  created() {
    this.config = require("@/config/config.json");

    axios.get(this.config.backend + "/dashboard/all").then(response => {
      let dashboards = [];

      for (var i in response.data.saved_objects) {
        let dashboard = response.data.saved_objects[i];
        dashboard.iframeLink =
          "http://scratchpad.ihris.org/kibana/app/kibana#/dashboard/" +
          dashboard.id +
          "?embed=true";

        dashboards.push(dashboard);
      }

      this.dashboards = dashboards;
    });
  },
  data() {
    return {
      config: null,
      dashboards: []
    };
  },
  mounted() {
    if (this.login) {
      this.$refs.alert.changeMessage("Login successful", "success");
    }
  },
  props: {
    login: {
      default: false,
      type: Boolean
    }
  }
};
</script>
