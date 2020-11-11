<template>
  <v-container>
    <v-card>
      <v-img
        src="@/assets/mHero.png"
        width="100"
      ></v-img>
      <ihrisReport report='ihris-es-report-mhero-send-message'></ihrisReport>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn
          style="white--font"
          :disabled="!canReview"
          normal
          @click="nextStep"
          rounded
        >
          <v-icon left>mdi-form-select</v-icon>
          Select Flow
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
      for (let field of this.reportData.fieldsDetails) {
        headers.push({ text: field[0], value: field[1] });
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