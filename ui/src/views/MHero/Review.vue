<template>
  <v-container>
    <v-alert type="success" v-model="alert">
      Messages sent!
    </v-alert>
    <v-card class="mb-5">
      <v-card-title>
        Workflow: {{ workflow }}
      </v-card-title>
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
      workflow: "Sample Workflow",
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
  methods: {
    send() {
      this.alert = true;
    }
  }
}
</script>
