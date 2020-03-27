<template>
  <v-container>
    <Alert ref="alert" v-if="dashboards.length == 0" type="error" text="No dashboards found" visible="true" />

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
import Alert from "@/components/Layout/Alert.vue";

export default {
  components: {
    Alert
  },
  methods: {
    setError(message) {
      this.$refs.alert.changeMessage(message, "error");
    }
  },
  props: ["dashboards"]
};
</script>
