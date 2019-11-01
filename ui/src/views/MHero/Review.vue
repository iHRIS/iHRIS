<template>
  <v-container>
    <v-alert type="success" v-model="alert">
      Messages sent!
    </v-alert>
    <v-card class="mb-5">
      <v-card-title>
        Workflow: {{ workflow }}
      </v-card-title>
      <v-card-text>
        How often should notifications be sent?
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
        Recipients
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="practitioners"
        item-key="name"
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="secondary">
        <v-spacer></v-spacer>
        <v-btn normal v-on:click="send">Send Workflow</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      frequency: null,
      workflow: "Sample Workflow",
      headers: [
        { text: 'Name', value: 'name'},
        { text: 'Jurisdiction', value: 'jurisdiction' },
        { text: 'Facility', value: 'facility' },
        { text: 'Cadre', value: 'cadre' },
        { text: 'Organization', value: 'organization' },
        { text: 'Contact Group', value: 'contactGroup' },
      ],
      items: ["minutes", "hours", "days", "weeks"],
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
          name: "Ikechukwu Odoi",
          jurisdiction: "Port Loko",
          facility: "Port Loko Hospital",
          cadre: "Pharmacist",
          organization: "Best Implementing Partner",
          contactGroup: "Pharmacists"
        },
        {
          name: "Zainab Khan",
          jurisdiction: "Moyamba",
          facility: "Moyamba Clinic North",
          cadre: "Nurse",
          organization: "FBO Clinic",
          contactGroup: "Outbreaks & Alerts, Nurses"
        }
      ],
      workflows: [
        "Flu Epidemic", "Emergency Closure", "National Emergency", "H1N1 Outbreak", "Viral Epidemic"
      ]
    };
  },
  computed: {
    recurring() {
      return this.frequency === "recurring";
    }
  },
  methods: {
    send() {
      this.alert = true;
    }
  }
}
</script>
