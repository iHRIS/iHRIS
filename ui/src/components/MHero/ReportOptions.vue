<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-autocomplete
        label="Category"
        :items="categories"
        v-model="category"
        chips
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" v-if="category">
      <v-autocomplete :label="category" :items="options" multiple chips>
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    options() {
      if (this.category == "Cadre") {
        return [
          "ART Manager",
          "Lab Tech",
          "Midwife",
          "Nurse",
          "Officer in Charge",
          "Pharmacist",
          "Surveillance Officer"
        ];
      }

      if (this.category == "Jurisdiction") {
        return [
          "Bo",
          "Kailahun",
          "Kenema",
          "Kono",
          "Makeni",
          "Moyamba",
          "Port Loko"
        ];
      }

      if (this.category == "User") {
        return ["User 1", "User 2", "User 3"];
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
      categories: ["Cadre", "Jurisdiction", "User", "Workflow"],
      individuals: [
        "Grace Bah",
        "Blessing Condeh",
        "Maria Tucker",
        "Joseph Simbeye"
      ],
      workflows: [
        "Flu Epidemic",
        "Emergency Closure",
        "National Emergency",
        "H1N1 Outbreak",
        "Viral Epidemic"
      ]
    };
  }
};
</script>
