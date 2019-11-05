<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        Run Report
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Category"
              :items="categories"
              v-model="category"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" v-if="category">
            <v-autocomplete
              :label="category"
              :items="options"
              multiple
              chips
            >
            </v-autocomplete>
          </v-col>
        </v-row>
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
export default {
  computed: {
    options() {
      if (this.category == "Cadre") {
        return [
          "ART Manager", "Lab Tech", "Midwife", "Nurse", "Officer in Charge", "Pharmacist", "Surveillance Officer"
        ];
      }

      if (this.category == "Jurisdiction") {
        return [
          "Bo", "Kailahun", "Kenema", "Kono", "Makeni", "Moyamba", "Port Loko"
        ];
      }

      if (this.category == "User") {
        return [
          "User 1", "User 2", "User 3"
        ];
      }

      if (this.category == "Workflow") {
        return this.workflows;
      }

      return [];
    }
  },
  data() {
    return {
      category: null,
      categories: [
        "Cadre", "Jurisdiction", "User", "Workflow"
      ],
      fromDate: null,
      fromPicker: false,
      individuals: [
        "Grace Bah", "Blessing Condeh", "Maria Tucker", "Joseph Simbeye"
      ],
      toDate: null,
      toPicker: false,
      workflows: [
        "Flu Epidemic", "Emergency Closure", "National Emergency", "H1N1 Outbreak", "Viral Epidemic"
      ]
    };
  }
}
</script>
