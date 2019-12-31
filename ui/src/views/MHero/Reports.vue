<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        Run Report
      </v-card-title>
      <v-card-text>
        <div v-for="item in numOptions" v-bind:key="item">
          <ReportOptions />
        </div>
        <v-btn
          @click="numOptions++"
        >
          Add Options
        </v-btn>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="fromPicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fromDate"
                  label="From"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="fromDate" @input="fromPicker = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="toPicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="toDate"
                  label="To"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="toDate" @input="toPicker = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn>Run Report</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import ReportOptions from "@/components/MHero/ReportOptions.vue";

export default {
  components: {
    ReportOptions
  },
  data() {
    return {
      fromDate: null,
      fromPicker: false,
      numOptions: 1,
      toDate: null,
      toPicker: false
    };
  }
}
</script>
