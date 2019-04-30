<template>
  <v-footer color="white" app height="75">
    <v-layout align-center>
      <v-flex xs2>
        <a href="https://www.usaid.gov" target="_blank">
          <img :src="usaidLogo" style="max-height: 70px;" />
        </a>
      </v-flex>
      <v-flex xs2>
        <a href="https://www.capacityplus.org" target="_blank">
          <img :src="capacityPlusLogo" style="max-height: 70px;" />
        </a>
      </v-flex>
      <v-flex xs2>
        <a href="https://www.intrahealth.org" target="_blank">
          <img :src="intrahealthLogo" style="max-height: 70px;" />
        </a>
      </v-flex>
      <v-spacer />
      <v-flex xs4>
        <v-btn to="user-manual" flat>
          User Manual
        </v-btn>
        <v-btn to="feedback" flat>
          Feedback
        </v-btn>
        <v-btn href="https://www.ihris.org" target="_blank" flat>
          iHRIS Website
        </v-btn>
        <v-btn to="terms-and-conditions" flat>
          Terms &amp; Conditions
        </v-btn>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      capacityPlusLogo: require("@/assets/logos/capacityPlus.png"),
      intrahealthLogo: require("@/assets/logos/intrahealth.png"),
      usaidLogo: require("@/assets/logos/usaid.png")
    };
  }
};
</script>
