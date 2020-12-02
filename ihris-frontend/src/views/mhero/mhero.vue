<template>
  <v-stepper v-model="stepper">
    <v-stepper-items>
      <v-stepper-content step="1">
        <selectRecipients @mheroRecipientsSelected="importData" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <reviewRecipients
          :headers="headers"
          :practitioners="selectedPractitioners"
          :sendToMatchingTerms="sendToMatchingTerms"
          :terms="terms"
          :reportData="reportData"
          @editWorkflow="changeWorkflow"
        />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import selectRecipients from "@/views/mhero/selectRecipients.vue";
import reviewRecipients from "@/views/mhero/reviewRecipients.vue";

export default {
  components: {
    selectRecipients,
    reviewRecipients
  },
  data() {
    return {
      headers: [],
      selectedPractitioners: [],
      terms: {},
      sendToMatchingTerms: false,
      reportData: {},
      stepper: 1
    };
  },
  methods: {
    changeWorkflow() {
      this.stepper = 1;
    },
    importData(selectedPractitioners, headers, terms, sendToMatchingTerms, reportData) {
      this.selectedPractitioners = selectedPractitioners;
      this.headers = headers;
      this.terms = terms
      this.sendToMatchingTerms = sendToMatchingTerms
      this.reportData = reportData
      this.stepper = 2;
    }
  }
};
</script>