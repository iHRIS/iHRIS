<template>
  <v-flex>
    <v-layout row>
      <v-flex xs4 class="font-weight-bold">First name</v-flex>
      <v-flex xs8>{{ practitioner.firstName }}</v-flex>
    </v-layout>

    <v-divider class="pb-3" />

    <v-layout row>
      <v-flex xs4 class="font-weight-bold">Surname</v-flex>
      <v-flex xs8>{{ practitioner.surname }}</v-flex>
    </v-layout>

    <v-divider class="pb-3" />

    <v-layout row>
      <v-flex xs4 class="font-weight-bold">Nationality</v-flex>
      <v-flex xs8>{{ practitioner.nationality }}</v-flex>
    </v-layout>

    <v-divider class="pb-3" />

    <v-layout row>
      <v-flex xs4 class="font-weight-bold">Residence</v-flex>
      <v-flex xs8>{{ practitioner.residence }}</v-flex>
    </v-layout>

    <v-divider class="pb-3" />
  </v-flex>
</template>

<script>
import axios from "axios";

export default {
  props: ["practitioner"]
};
</script>
