<template>
  <v-container>
    <v-layout row wrap class="pb-5">
      <v-flex xs6 class="display-2 text-xs-left">
        {{ name }}
      </v-flex>
      <v-flex xs3 offset-xs3>
        <Alert ref="alert" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 class="pr-3">
        <div
          v-for="(element, index) in this.practitioner"
          v-bind:key="'edit-' + index"
        >
          <DetailsCard
            v-if="index != 'id' && index != 'resourceType' && index != 'active'"
            :data="element"
            :name="index"
            v-on:saveData="saveSubsectionData"
            v-on:deleteData="deleteSubsectionData"
            edit
            :ref="'subsection' + index"
          />
        </div>

        <v-card v-show="details">
          <v-card-title class="display-1">
            {{ detailTitle | sentenceCase }}
          </v-card-title>
          <v-card-text>
            <DynamicForm
              v-show="details"
              :name="detailTitle"
              :fields="detailFields"
              v-on:cancel="cancelDetailsForm"
              v-on:successfulSubmit="submitDetailsForm"
              ref="detailsForm"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <AddSectionsMenu
          v-on:toggleForm="toggleForm"
          :data="this.practitioner"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

import AddSectionsMenu from "@/components/People/AddSectionsMenu.vue";
import Alert from "@/components/Layout/Alert.vue";
import DetailsCard from "@/components/People/DetailsCard.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import Vue from "vue";

export default {
  components: {
    AddSectionsMenu,
    Alert,
    DetailsCard,
    DynamicForm
  },
  created() {
    axios
      .get("/practitioner/view/" + this.$route.params.id)
      .then(practitioner => {
        if (practitioner.status === 201) {
          let component = this;

          this.practitioner = practitioner.data.entry[0].resource;
          this.updateName();
        }
      });
  },
  data() {
    return {
      details: false,
      detailFields: {},
      detailTitle: null,
      name: null,
      practitioner: {}
    };
  },
  methods: {
    cancelDetailsForm() {
      this.details = false;
      this.detailsFields = {};
      this.detailTitle = null;

      this.$refs.alert.reset();
    },
    deleteSubsectionData(field, index) {
      let component = this;

      if (typeof index !== "undefined" && this.practitioner[field].length > 1) {
        this.practitioner[field] = this.practitioner[field].splice(index, 1);
      } else {
        Vue.delete(this.practitioner, field);
      }

      axios.put("/practitioner/edit", this.practitioner).then(response => {
        component.updateName();

        if (response.status == 201) {
          if (component.$refs["subsection" + field][0]) {
            component.$refs["subsection" + field][0].showAlert(
              "Item deleted successfully!",
              "success"
            );
          }
        } else {
          component.$refs["subsection-" + field][0].showAlert(
            "There was an error deleting this data.",
            "error"
          );
        }
      });
    },
    saveSubsectionData(data, field, index) {
      let component = this;
      let practitioner = this.practitioner;

      // this is necessary for subsections that can have multiple entries
      if (index && index >= 0) {
        practitioner[field][index] = data;
      } else if (index == -1) {
        // this is a special case where a new entry is being
        // added to a multiple field
        practitioner[field].push(data);
      } else {
        practitioner[field] = data;
      }

      axios.put("/practitioner/edit", practitioner).then(response => {
        component.practitioner = practitioner;

        if (response.status == 201) {
          component.$refs["subsection" + field][0].showAlert(
            "Data changed successfully!",
            "success"
          );
        } else {
          component.$refs["subsection-" + field][0].showAlert(
            "There was an error saving this data.",
            "error"
          );
        }
      });
    },
    submitDetailsForm() {
      console.log("Calling get inputs");
      let component = this;
      let input = this.$refs.detailsForm.getInputs();

      let practitioner = this.practitioner;
      let title = this.detailTitle;

      practitioner[this.detailTitle] = input;

      axios.put("/practitioner/edit", practitioner).then(response => {
        if (response.status == 201) {
          component.cancelDetailsForm();
          component.$refs.alert.changeMessage(
            title + " added successfully!",
            "success"
          );
        } else {
          component.$refs.alert.changeMessage(
            "There was an error saving this data.",
            "error"
          );
        }
      });
    },
    toggleForm(fields, title) {
      this.details = true;
      this.detailFields = fields;
      this.detailTitle = title;

      let fake = {
        fields: {
          code: {
            fields: {
              coding: {
                name: "security"
              },
              text: {
                name: "text"
              }
            }
          },
          identifier: {
          },
          issuer: {
          },
          period: {
          }
        }
      };

      this.$refs.alert.reset();
      this.$refs.detailsForm.changeFields(fields);
    },
    updateName() {
      let name = "";
      let practitioner = this.practitioner;

      if (practitioner.name[0]) {
        if (practitioner.name[0].prefix) {
          name += practitioner.name[0].prefix[0] + " ";
        }

        if (practitioner.name[0].given) {
          name += practitioner.name[0].given[0] + " ";
        }

        if (practitioner.name[0].family) {
          name += practitioner.name[0].family + " ";
        }

        if (practitioner.name[0].suffix) {
          name += practitioner.name[0].suffix[0] + " ";
        }
      }

      this.name = name.trim();
    }
  },
  name: "AddSections"
};
</script>
