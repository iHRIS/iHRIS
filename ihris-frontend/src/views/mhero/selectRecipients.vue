<template>
  <v-container>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='ihris-es-report-mhero-send-message'></ihrisReport>
      <v-card-actions class="secondary">
        <v-btn
          :disabled="totalRecords === 0"
          style="white--font"
          normal
          @click="sendToAll"
          rounded
        >
          <v-icon left>mdi-arrow-expand-all</v-icon>
          Select Flow and Send to All {{parseInt(totalRecords).toLocaleString()}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          style="white--font"
          :disabled="!canReview"
          normal
          @click="nextStep"
          rounded
        >
          <v-icon left>mdi-form-select</v-icon>
          Select Flow And Send To Selected ({{practitioners.length}})
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import ihrisReport from "@/views/es-report";
import { eventBus } from "@/main";
export default {
  data() {
    return {
      send: false,
      practitioners: [],
      reportData: {},
      terms: {},
      termsConditions: {},
      sendToMatchingTerms: false,
      totalRecords: 0
    };
  },
  computed: {
    canReview() {
      if (this.practitioners.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    sendToAll() {
      eventBus.$emit("mhero-select-all")
      this.send = true
    },
    nextStep() {
      let headers = [];
      for (let field of this.reportData.fieldsDetails) {
        headers.push({ text: field[0], value: field[1] });
      }
      this.$emit("mheroRecipientsSelected", this.practitioners, headers, this.terms, this.termsConditions, this.sendToMatchingTerms, this.reportData);
      this.send = false
    }
  },
  components: {
    ihrisReport: ihrisReport
  },
  created() {
    eventBus.$on("report-total-records", (totalRecords) => {
      this.totalRecords = totalRecords
    })
    eventBus.$on("ihris-report-selections", (selections, reportData, terms, termsConditions, sendToMatchingTerms) => {
      this.sendToMatchingTerms = sendToMatchingTerms
      this.terms = terms
      this.termsConditions = termsConditions
      this.practitioners = selections;
      this.reportData = reportData;
      if(this.send) {
        this.nextStep()
      }
    });
  }
};
</script>
