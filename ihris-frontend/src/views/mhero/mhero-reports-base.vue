<template>
  <v-container>
    <v-card
      shaped
      class="md ma-2"
    >
      <v-card-title
        dark
        class="primary white--text subtitle font-weight-bold text-uppercase"
      >
        <v-icon dark>mdi-list</v-icon>
        Reports
      </v-card-title>

      <v-card-text>
        <v-list >
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-summary"
            key="1"
          >
            <v-list-item-title class="text-h2">Flow Summary</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-run-summary"
            key="2"
          >
            <v-list-item-title class="text-h2">Flow Run Summary</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-message-exchange"
            key="3"
          >
            <v-list-item-title class="text-h2">Message Exchange</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script>
// import ihrisReport from "@/views/es-report";
// import { eventBus } from "@/main";
export default {

};
</script>