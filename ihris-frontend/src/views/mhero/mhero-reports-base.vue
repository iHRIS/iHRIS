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
            to="/report/ihris-es-report-mhero-workflows"
            key="1"
          >
            <v-list-item-title class="text-h2">Workflows Overview</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-run-summary"
            key="2"
          >
            <v-list-item-title class="text-h2">Flow Run Summary</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-run-summary-bycadre"
            key="3"
          >
            <v-list-item-title class="text-h2">Flow Run Summary By Cadre</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-run-summary-byregion"
            key="4"
          >
            <v-list-item-title class="text-h2">Flow Run Summary By County</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-flow-run-breakdown"
            key="5"
          >
            <v-list-item-title class="text-h2">Flow Run Breakdown</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-message-send-summary"
            key="6"
          >
            <v-list-item-title class="text-h2">Message Sending Summary</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-message-send-summary-bycadre"
            key="7"
          >
            <v-list-item-title class="text-h2">Message Sending Summary By Cadre</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-message-send-summary-byregion"
            key="8"
          >
            <v-list-item-title class="text-h2">Message Sending Summary By County</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-mhero-message-send-breakdown"
            key="9"
          >
            <v-list-item-title class="text-h2">Message Sending Breakdown</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/report/ihris-es-report-message-exchange"
            key="10"
          >
            <v-list-item-title class="text-h2">Message Exchange</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script>
export default {

};
</script>