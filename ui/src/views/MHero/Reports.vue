<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        Run Report by Workflow
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          label="Workflow"
          :items="workflows"
        >
        </v-autocomplete>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="From"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="To"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="primary">
        <v-spacer></v-spacer>
        <v-btn text>Run Report</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-5">
      <v-card-title>
        Run Report by Individuals
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          label="Individual"
          :items="individuals"
        >
        </v-autocomplete>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="From"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="To"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="primary">
        <v-spacer></v-spacer>
        <v-btn text>Run Report</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      individuals: [
        "Grace Bah", "Blessing Condeh", "Maria Tucker", "Joseph Simbeye"
      ],
      workflows: [
        "Flu Epidemic", "Emergency Closure", "National Emergency", "H1N1 Outbreak", "Viral Epidemic"
      ]
    };
  }
}
</script>
