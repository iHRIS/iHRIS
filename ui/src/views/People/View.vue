<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="display-2 text-xs-center pb-5">{{ practitioner.firstName }} {{ practitioner.surname }}</v-flex>
      <v-flex xs6 class="pr-3">
        <v-card>
          <v-card-title class="display-1">Individual Information</v-card-title>
          <v-card-text class="primary--text text-uppercase">Basic Profile</v-card-text>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <v-card class="primary darken-1 white--text">
          <v-card-title class="display-1">Add Sections</v-card-title>
          <v-list class="primary darken-1 white--text">
            <v-list-group
              v-for="item in menu"
              :key="item.title"
              prepend-icon="add"
              no-action
            >
              <template v-slot:activator>
                <v-list-tile active-class="primary darken-2">
                  <v-list-tile-content>
                    <v-list-tile-title
                      class="text-uppercase font-weight-bold"
                    >
                      {{ item.title }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios.get('/practitioner/view/' + this.$route.params.id).then(response => {
      if (response.status === 201) {
        this.practitioner = response.data;
      }
    });
  },
  data() {
    return {
      menu: [
        {
          title: "Contact Information"
        },
        {
          title: "Next of Kin"
        },
        {
          title: "Position"
        },
        {
          title: "Confirmation"
        },
        {
          title: "Qualifications"
        },
        {
          title: "Training Courses"
        },
        {
          title: "Disciplinary Actions"
        },
        {
          title: "Employment History",
        },
        {
          title: "Education History",
        },
        {
          title: "Notes"
        }
      ],
      practitioner: {}
    };
  },
  name: "AddSections"
};
</script>
