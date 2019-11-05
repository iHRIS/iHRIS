<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-text>
        <v-autocomplete
          label="Workflow"
          :items="workflows"
        >
        </v-autocomplete>

        How often should this workflow be sent?

        <v-radio-group row v-model="frequency">
          <v-radio label="Once" value="once"></v-radio>
          <v-radio label="Recurring" value="recurring"></v-radio>
        </v-radio-group>
        <v-row v-if="recurring">
          <v-col cols="1">
            <v-subheader>Every</v-subheader>
          </v-col>
          <v-col cols="1">
            <v-text-field
              label="Frequency"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-select
              label="Period"
              :items="items"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        Practitioners
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="practitioners"
        :search="search"
        item-key="name"
        show-select
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn :to="{name: 'mhero-review'}">Review Selection</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    recurring() {
      return this.frequency === "recurring";
    }
  },
  data() {
    return {
      search: null,
      selected: [],
      frequency: false,
      items: ["minutes", "hours", "days", "weeks"],
      headers: [
        { text: 'Name', value: 'name'},
        { text: 'Jurisdiction', value: 'jurisdiction' },
        { text: 'Facility', value: 'facility' },
        { text: 'Cadre', value: 'cadre' },
        { text: 'Organization', value: 'organization' },
        { text: 'Contact Group', value: 'contactGroup' },
      ],
      practitioners: [
        {
          name: "Grace Bah",
          jurisdiction: "Port Loko",
          facility: "Gbaama MCHP",
          cadre: "Midwife",
          organization: "MOHS",
          contactGroup: "Midwives"
        },
        {
          name: "Blessing Condeh",
          jurisdiction: "Kono",
          facility: "Upper Saama MCHP",
          cadre: "Officer in Charge",
          organization: "MOHS",
          contactGroup: "OIC"
        },
        {
          name: "Maria Tucker",
          jurisdiction: "Bo",
          facility: "Choithram Hospital",
          cadre: "Surveillence Officer",
          organization: "National Public Health Institute",
          contactGroup: "Outbreaks & Alerts"
        },
        {
          name: "Joseph Simbeye",
          jurisdiction: "Bo",
          facility: "Choithram Hospital",
          cadre: "Officer in Charge",
          organization: "Best Implementing Partner",
          contactGroup: "OIC"
        },
        {
          name: "Jonathan Onyishi",
          jurisdiction: "Kono",
          facility: "Yakaji Health Center",
          cadre: "Midwife",
          organization: "MOHS",
          contactGroup: "Midwives"
        },
        {
          name: "Ikechukwu Odoi",
          jurisdiction: "Port Loko",
          facility: "Port Loko Hospital",
          cadre: "Pharmacist",
          organization: "Best Implementing Partner",
          contactGroup: "Pharmacists"
        },
        {
          name: "Innocent Makor",
          jurisdiction: "Kailahun",
          facility: "Baoma Station Health Post",
          cadre: "Nurse",
          organization: "MOHS",
          contactGroup: "Outbreaks & Alerts, Nurses"
        },
        {
          name: "Mohammed Abioye",
          jurisdiction: "Kenema",
          facility: "Jembe Community Health Center",
          cadre: "Midwife",
          organization: "MOHS",
          contactGroup: "Midwives"
        },
        {
          name: "Zainab Khan",
          jurisdiction: "Moyamba",
          facility: "Moyamba Clinic North",
          cadre: "Nurse",
          organization: "FBO Clinic",
          contactGroup: "Outbreaks & Alerts, Nurses"
        },
        {
          name: "Yasir Danfakha",
          jurisdiction: "Makeni",
          facility: "Second National Reference Lab",
          cadre: "Lab Tech",
          organization: "National Reference Labs",
          contactGroup: "Outbreaks & Alerts"
        },
        {
          name: "Abdul Achebe",
          jurisdiction: "Makeni",
          facility: "Central Health Center",
          cadre: "ART Manager",
          organization: "Best Implementing Partner",
          contactGroup: null
        }
      ],
      workflows: [
        "Flu Epidemic", "Emergency Closure", "National Emergency", "H1N1 Outbreak", "Viral Epidemic"
      ]
    };
  }
}
</script>
