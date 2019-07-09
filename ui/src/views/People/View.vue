<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="display-2 text-xs-center pb-5">
        {{ practitioner.name[0].prefix[0] }} {{ practitioner.name[0].given[0] }} {{ practitioner.name[0].family }} {{ practitioner.name[0].suffix[0] }}
      </v-flex>
      <v-flex xs6 class="pr-3">
        <v-card class="mb-5">
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
              v-on:successfulSubmit="submitIndividualInformationForm"
              ref="individualInformationForm"
            />
          </v-card-text>
        </v-card>

        <v-card v-show="details">
          <v-card-text>
            <DetailsForm
              v-show="details"
              :fields="detailFields"
              v-on:cancel="cancelDetailsForm"
              v-on:successfulSubmit="submitDetailsForm"
              ref="detailsForm"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <AddSectionsMenu v-on:toggleForm="toggleForm" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import AddSectionsMenu from "@/components/People/AddSectionsMenu.vue";
import DetailsForm from "@/components/People/DetailsForm.vue";
import IndividualInformationForm from "@/components/People/IndividualInformationForm.vue";
import PractitionerBasicProfile from "@/components/People/PractitionerBasicProfile.vue";

export default {
  components: {
    AddSectionsMenu,
    DetailsForm,
    IndividualInformationForm,
    PractitionerBasicProfile
  },
  created() {
    axios.get("/practitioner/view/" + this.$route.params.id).then(response => {
      if (response.status === 201) {
        console.log(response.data.entry[0].resource);
        this.practitioner = response.data.entry[0].resource;
        this.$refs.individualInformationForm.updateData(response.data);
      }
    });
  },
  data() {
    return {
      details: false,
      detailFields: {},
      editing: false,
      practitioner: {}
    };
  },
  methods: {
    cancelDetailsForm() {
    },
    cancelIndividualInformationForm() {
      this.editing = false;
    },
    submitDetailsForm() {
    },
    submitIndividualInformationForm() {
      let input = this.$refs.individualInformationForm.getInputs();
      input["id"] = this.$route.params.id;

      axios.post("/practitioner/edit", input).then(response => {
        if (response.status === 201) {
          this.practitioner = response.data;
          this.$refs.individualInformationForm.updateData(response.data);
        } else {
          this.$refs.individualInformationForm.showErrors(
            "There was an error saving this data."
          );
        }
      });
    },
    toggleForm(fields, title) {
      this.details = true;
      this.detailFields = fields;

      this.$refs.detailsForm.changeFields(fields, title);
    }
  },
  name: "AddSections"
};
</script>
