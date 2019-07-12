<template>
  <v-container>
    <v-layout row wrap class="pb-5">
      <v-flex xs6 class="display-2 text-xs-left">
        {{ practitioner.name[0].prefix[0] }} {{ practitioner.name[0].given[0] }} {{ practitioner.name[0].family }} {{ practitioner.name[0].suffix[0] }}
      </v-flex>
      <v-flex xs3 offset-xs3>
        <Alert ref="alert" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 class="pr-3">
        <div v-for="(element, index) in this.practitioner">
          <v-card v-if="index != 'id' && index != 'resourceType' && index != 'active'" class="mb-5">
            <v-card-title class="display-1">
              {{ index }}
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
            <v-card-text v-for="(value, name) in element">
              <div v-if="Array.isArray(value) || typeof value === 'object'">
                <div v-if="Number.isInteger(name)">
                  <div v-for="(data, fieldIndex) in value">
                    <v-layout row>
                      <v-flex xs4 class="font-weight-bold">{{ fieldIndex }}</v-flex>
                      <v-flex xs8>{{ data }}</v-flex>
                    </v-layout>

                    <v-divider class="pb-3" />
                  </div>
                </div>
                <div v-else>
                  <v-layout row>
                    <v-flex xs4 class="font-weight-bold">{{ name }}</v-flex>
                    <v-flex xs8 v-for="data in value">
                      {{ data }}
                    </v-flex>
                  </v-layout>

                  <v-divider class="pb-3" />
                </div>
              </div>
              <div v-else>
                <v-layout row>
                  <v-flex xs4 class="font-weight-bold">{{ name }}</v-flex>
                  <v-flex xs8>{{ value }}</v-flex>
                </v-layout>

                <v-divider class="pb-3" />
              </div>
            </v-card-text>
          </v-card>
        </div>

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
          <v-card-title class="display-1">
            {{ detailTitle }}
          </v-card-title>
          <v-card-text>
            <DynamicForm
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
import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import IndividualInformationForm from "@/components/People/IndividualInformationForm.vue";
import PractitionerBasicProfile from "@/components/People/PractitionerBasicProfile.vue";

export default {
  components: {
    AddSectionsMenu,
    Alert,
    DynamicForm,
    IndividualInformationForm,
    PractitionerBasicProfile
  },
  created() {
    axios.get("/practitioner/view/" + this.$route.params.id).then(response => {
      if (response.status === 201) {
        this.practitioner = response.data.entry[0].resource;
      }
    });
  },
  data() {
    return {
      details: false,
      detailFields: {},
      detailTitle: null,
      editing: false,
      practitioner: {},
      sanitizedPractitioner: []
    };
  },
  methods: {
    cancelDetailsForm() {
      this.details = false;
      this.detailsFields = {};
      this.detailTitle = null;

      this.$refs.alert.reset();
    },
    cancelIndividualInformationForm() {
      this.editing = false;
    },
    submitDetailsForm() {
      let component = this;
      let input = this.$refs.detailsForm.getInputs();

      let practitioner = this.practitioner;
      let title = this.detailTitle;

      practitioner[this.detailTitle] = input;

      axios.put("/practitioner/edit", practitioner).then(response => {
        if (response.status == 201) {
          component.cancelDetailsForm();
          component.$refs.alert.changeMessage(title + " added successfully!", "success");
        } else {
          component.$refs.alert.changeMessage("There was an error saving this data.", "error");
        }
      });
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
      this.detailTitle = title;

      this.$refs.alert.reset();
      this.$refs.detailsForm.changeFields(fields);
    }
  },
  name: "AddSections"
};
</script>
