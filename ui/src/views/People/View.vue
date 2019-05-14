<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="display-2 text-xs-center pb-5">
        {{ practitioner.firstName }} {{ practitioner.surname }}
      </v-flex>
      <v-flex xs6 class="pr-3">
        <v-card>
          <v-card-title class="display-1">
            Individual Information
            <v-spacer />
            <v-btn
              fab
              class="primary"
              @click.stop="editing = true"
              v-show="!editing"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="primary--text text-uppercase">
            Basic Profile
          </v-card-text>
          <v-card-text>
            <PractitionerBasicProfile
              v-show="!editing"
              :practitioner="practitioner"
            />

            <IndividualInformationForm
              v-show="editing"
              :practitioner="practitioner"
              v-on:cancel="cancelIndividualInformationForm"
              ref="individualInformationForm"
            />
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
              class="pb-3"
            >
              <template v-slot:activator>
                <v-list-tile active-class="primary darken-2">
                  <v-list-tile-content>
                    <v-list-tile-title class="text-uppercase font-weight-bold">
                      {{ item.title }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="white--text">
                      {{ item.subtitle }}
                    </v-list-tile-sub-title>
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
import IndividualInformationForm from "@/components/People/IndividualInformationForm.vue";
import PractitionerBasicProfile from "@/components/People/PractitionerBasicProfile.vue";

export default {
  components: {
    IndividualInformationForm,
    PractitionerBasicProfile
  },
  created() {
    axios.get("/practitioner/view/" + this.$route.params.id).then(response => {
      if (response.status === 201) {
        this.practitioner = response.data;
        this.$refs.individualInformationForm.updateData(response.data);
      }
    });
  },
  data() {
    return {
      editing: false,
      menu: [
        {
          title: "Contact Information",
          subtitle:
            "Work contact, Personal contract, Emergency contract, Other contact"
        },
        {
          title: "Next of Kin",
          subtitle: "Relationship, Contact information"
        },
        {
          title: "Position",
          subtitle: "Position, Salary, Facility"
        },
        {
          title: "Confirmation",
          subtitle: "Confirmation details"
        },
        {
          title: "Qualifications",
          subtitle: "Registration, Language proficiency, Competency"
        },
        {
          title: "Training Courses",
          subtitle: "Training course details"
        },
        {
          title: "Disciplinary Actions",
          subtitle: "Disciplinary actions, History"
        },
        {
          title: "Application",
          subtitle: "Applications, Interview details, Hiring decision"
        },
        {
          title: "Employment History",
          subtitle: "Employment"
        },
        {
          title: "Notes",
          subtitle: "Notes"
        }
      ],
      practitioner: {}
    };
  },
  methods: {
    cancelIndividualInformationForm() {
      this.editing = false;
    }
  },
  name: "AddSections"
};
</script>
