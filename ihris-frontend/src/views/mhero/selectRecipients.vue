<template>
  <v-container>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='mhero'></ihrisReport>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn
          style="white--font"
          :disabled="!canReview"
          normal
          @click="nextStep"
          rounded
        >Review Selection</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import ihrisReport from "@/views/fhir-report";
import { eventBus } from "@/main";
export default {
  data() {
    return {
      practitioners: [],
      reportData: {}
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
    nextStep() {
      let headers = [];
      for (let data of this.reportData.fieldsDetails) {
        for (let field of data.fields) {
          headers.push({ text: field[0], value: field[1] });
        }
      }
      this.$emit("mheroRecipientsSelected", this.practitioners, headers);
    }
  },
  components: {
    ihrisReport: ihrisReport
  },
  created() {
    eventBus.$on("ihris-report-selections", (selections, reportData) => {
      this.practitioners = selections;
      this.reportData = reportData;
    });
  }
};
</script>