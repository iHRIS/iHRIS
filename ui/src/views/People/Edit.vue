<template>
  <v-container>
    <v-alert v-model="alert" dismissable type="error">
      {{ error }}
    </v-alert>
    <ProfileHeader
      :practitioner="practitioner"
      :edit="true"
      :screenSize="screenSize"
      ref="profileHeader"
      v-on:changePractitioner="changePractitioner"
    />
    <AddSectionsMenu
      v-if="smallScreen"
      v-on:toggleForm="toggleForm"
      :data="this.practitioner"
    />
    <v-layout>
      <v-flex :class="applyGridLayout">
        <div v-for="(element, index) in display" v-bind:key="'edit-' + index">
          <DetailsCard
            v-if="index != 'id' && index != 'resourceType' && index != 'active'"
            :data="element"
            :name="index"
            :screenSize="screenSize"
            v-on:saveData="saveSubsectionData"
            v-on:deleteData="deleteSubsectionData"
            edit
            :ref="'subsection' + index"
            :validationRules="uiValidationRules"
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
              :validationRules="uiValidationRules"
              v-on:cancel="cancelDetailsForm"
              v-on:successfulSubmit="submitDetailsForm"
              ref="detailsForm"
            />
          </v-card-text>
        </v-card>
      </v-flex>

      <AddSectionsMenu
        v-if="!smallScreen"
        v-on:toggleForm="toggleForm"
        :data="this.practitioner"
      />
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import AddSectionsMenu from "@/components/People/AddSectionsMenu.vue";
import Capitalize from "@/mixins/Capitalize.js";
import DetailsCard from "@/components/People/DetailsCard.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import ProfileHeader from "@/components/People/ProfileHeader.vue";
import SectionsToDisplay from "@/mixins/SectionsToDisplay.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";
import Vue from "vue";
import MobileLayout from "@/mixins/MobileLayout.js";

export default {
  created() {
    this.screenSize = this.$vuetify.breakpoint.name;
  },
  computed: {
    applyGridLayout() {
      return this.gridLayoutShowRecord(this.$vuetify.breakpoint.name);
    },
    smallScreen() {
      return this.smallScreenCompute(this.$vuetify.breakpoint.name);
    }
  },
  components: {
    AddSectionsMenu,
    DetailsCard,
    DynamicForm,
    ProfileHeader
  },
  data() {
    return {
      config: null,
      details: false,
      detailFields: {},
      detailPath: null,
      detailRaw: null,
      detailTitle: null,
      screenSize: "",
      structureDefinition: null,
      alert: false,
      error: "",
      uiValidationRules: [
        {
          formName: "workHistory",
          sourceFieldName: "active",
          condition: "eq",
          value: true,
          behavior: "hide",
          targetFieldName: "Period.end"
        }
      ]
    };
  },
  methods: {
    addPractitionerRole(data) {
      data.practitioner = {
        reference: "Practitioner/" + this.practitioner.id
      };

      for (var i in data) {
        if (i.indexOf(".") > -1) {
          _.set(data, i.split("."), data[i]);

          delete data[i];
        }
      }

      let practitionerRole = data.practitionerrole;
      delete data.practitionerrole;

      data = { ...data, ...practitionerRole };

      if (!this.practitioner.workHistory) {
        Vue.set(this.practitioner, "workHistory", []);
      }

      this.practitioner.workHistory.push(data);

      axios
        .post(this.config.backend + "/practitioner/add/work-history", data)
        .then(() => {
          this.cancelDetailsForm();
          this.$refs.profileHeader.changeMessage(
            "Work history added successfully!",
            "success"
          );
        });
    },
    cancelDetailsForm() {
      this.details = false;
      this.detailsFields = {};
      this.detailTitle = null;

      this.$refs.profileHeader.reset();
    },
    changePractitioner(practitioner) {
      this.practitioner = practitioner;
    },
    deleteSubsectionData(names, index, profile) {
      let field = names.key;

      // work history is stored separately
      if (field === "workHistory") {
        return this.deleteWorkHistory(index);
      }

      if (typeof index !== "undefined" && this.practitioner[field].length > 1) {
        this.practitioner[field].splice(index, 1);
      } else if (profile !== null) {
        for (var key in this.practitioner.extension) {
          let extension = this.practitioner.extension[key];

          if (extension.url === profile) {
            for (var i in extension) {
              if (i !== "url") {
                this.practitioner.extension.splice(key, 1);
                break;
              }
            }

            break;
          }
        }
      } else {
        Vue.delete(this.practitioner, field);
      }

      axios
        .post(this.config.backend + "/practitioner/edit", this.practitioner)
        .then(response => {
          let name = names.name;

          if (response.status == 201) {
            if (this.$refs["subsection" + name][0]) {
              this.$refs["subsection" + name][0].showAlert(
                "Item deleted successfully!",
                "success"
              );
            }
          } else {
            this.$refs["subsection-" + name][0].showAlert(
              "There was an error deleting this data.",
              "error"
            );
          }
        });
    },
    deleteWorkHistory(index) {
      let data = {
        id: this.practitioner.workHistory[index].id
      };

      axios
        .post(this.config.backend + "/practitioner/delete/work-history", data)
        .then(response => {
          if (response.status == 201) {
            if (this.$refs["subsectionworkHistory"][0]) {
              this.practitioner.workHistory.splice(index, 1);

              if (this.practitioner.workHistory.length === 0) {
                Vue.delete(this.practitioner.workHistory);
              }

              this.$refs["subsectionworkHistory"][0].showAlert(
                "Item deleted successfully!",
                "success"
              );
            }
          } else {
            this.$refs["subsectionworkHistory"][0].showAlert(
              "There was an error deleting this data.",
              "error"
            );
          }
        });
    },
    editWorkHistory(data, index) {
      // this happens when adding another work history element
      if (!this.practitioner.workHistory[index]) {
        return this.addPractitionerRole(data);
      }

      let id = this.practitioner.workHistory[index].id;
      data.id = id;

      // because of formatting reasons, we need to strip off the practitionerrole from the key
      for (var i in data) {
        if (i.startsWith("practitionerrole.")) {
          let key = i.substring("practitionerrole.".length);
          data[key] = data[i];
          delete data[i];
        }
      }

      data = this.flatten(data);
      data.practitioner = this.practitioner.workHistory[index].practitioner;

      Vue.set(this.practitioner.workHistory, index, data);

      axios
        .post(this.config.backend + "/practitioner/edit/work-history", data)
        .then(response => {
          if (response.status == 201) {
            this.$refs["subsectionworkHistory"][0].showAlert(
              "Data changed successfully!",
              "success"
            );
          } else {
            this.$refs["subsectionworkHistory"][0].showAlert(
              "There was an error saving this data.",
              "error"
            );
          }
        });
    },
    flatten(data) {
      // if a field name has a . in it, we need to store that in a subfield
      for (var i in data) {
        if (i.indexOf(".") >= 0) {
          let swap = data[i];
          delete data[i];

          _.set(data, i.slice("."), swap);
        }
      }

      return data;
    },
    saveSubsectionData(data, names, index, profile, structureDefinition) {
      let field = names.key;

      if (field === "workHistory") {
        return this.editWorkHistory(data, index);
      }

      let practitioner = this.practitioner;

      for (var j in data) {
        if (
          j.toLowerCase().startsWith(structureDefinition.toLowerCase() + ".")
        ) {
          data[
            j
              .toLowerCase()
              .slice(structureDefinition.length + 1)
              .toLowerCase()
          ] = data[j];
          delete data[j];
        }
      }

      // qualifications need a little extra formatting
      if (field === "qualification") {
        let reformatted = {
          identifier: [
            {
              value: data.number
            }
          ],
          code: {
            text: data.type
          },
          issuer: data.issuer,
          period: {
            start: data.received,
            end: data.expiration
          }
        };

        data = reformatted;
      }

      // this is necessary for subsections that can have multiple entries
      if (index >= 0) {
        Vue.set(practitioner[field], index, this.flatten(data));
      } else if (index == -1) {
        // this is a special case where a new entry is being
        // added to a multiple field
        practitioner[field].push(this.flatten(data));
      } else if (profile !== null) {
        for (var key in practitioner.extension) {
          let extension = practitioner.extension[key];

          if (extension.url === profile) {
            for (var i in extension) {
              if (i !== "url") {
                if (data.value) {
                  practitioner.extension[key][i] = data.value;
                } else {
                  practitioner.extension[key][i] = data;
                }

                break;
              }
            }

            break;
          }
        }
      } else {
        practitioner[field] = this.flatten(data);
      }

      this.practitioner = practitioner;

      axios
        .post(this.config.backend + "/practitioner/edit", practitioner)
        .then(response => {
          if (response.status == 201) {
            this.$refs["subsection" + names.name][0].showAlert(
              "Data changed successfully!",
              "success"
            );
          } else {
            this.$refs["subsection-" + names.name][0].showAlert(
              "There was an error saving this data.",
              "error"
            );
          }
        });
    },
    getProfilePicture(path) {
      return path;
    },
    submitDetailsForm() {
      let input = this.$refs.detailsForm.getInputs();

      if (this.detailTitle === "workHistory") {
        return this.addPractitionerRole(input);
      }

      let practitioner = this.practitioner;
      let title = this.detailTitle;

      if (title == "Qualifications") {
        let qualification = {};

        for (var key in this.detailFields) {
          let field = this.detailFields[key];

          if (input[field.name]) {
            _.set(
              qualification,
              field.path.replace("qualification.", ""),
              input[field.name]
            );
          }
        }

        if (!practitioner.qualification) {
          Vue.set(practitioner, "qualification", []);
        }

        practitioner.qualification.push(qualification);
        Vue.set(practitioner, "qualification", practitioner.qualification);
      } else if (this.detailPath && this.detailPath == "extension") {
        let extension = [];
        let newExtension = {
          url: this.extensionProfile
        };
        let valueString = null;

        if (practitioner.extension) {
          extension = practitioner.extension;
        }

        for (var fieldKey in this.detailFields) {
          let field = this.detailFields[fieldKey];

          valueString = "value" + this.capitalize(field.parentType);

          if (this.primitiveTypes.indexOf(field.parentType) >= 0) {
            for (var inputKey in input) {
              newExtension[valueString] = input[inputKey];
              break;
            }
          } else {
            for (var k in input) {
              newExtension[valueString] = {};

              if (k.indexOf(".") >= 0) {
                newExtension[valueString][k.substring(k.lastIndexOf(".") + 1)] =
                  input[k];
              } else {
                newExtension[valueString][k] = input[k];
              }
            }
          }
        }

        extension.push(newExtension);

        Vue.set(practitioner, "extension", extension);
      } else if (this.detailPath) {
        for (var j in input) {
          if (
            j
              .toLowerCase()
              .startsWith(this.structureDefinition.toLowerCase() + ".")
          ) {
            input[
              j
                .toLowerCase()
                .slice(this.structureDefinition.length + 1)
                .toLowerCase()
            ] = input[j];
            delete input[j];
          }
        }

        if (!practitioner[this.detailPath]) {
          Vue.set(this.practitioner, this.detailPath, [input]);
        }

        input = this.flatten(input);

        // if a field name has a . in it, we need to store that in a subfield
        for (var i in input) {
          if (i.indexOf(".") >= 0) {
            let swap = input[i];
            delete input[i];

            _.set(input, i.slice("."), swap);
          }
        }

        _.set(practitioner, this.detailPath, [input]);
      } else {
        practitioner = { ...practitioner, ...input };
      }

      this.practitioner = practitioner;

      axios
        .post(this.config.backend + "/practitioner/edit", practitioner)
        .then(response => {
          if (response.status == 201) {
            this.cancelDetailsForm();
            this.$refs.profileHeader.changeMessage(
              this.capitalize(title) + " added successfully!",
              "success"
            );
          } else {
            this.$refs.profileHeader.changeMessage(
              "There was an error saving this data.",
              "error"
            );
          }
        });
    },
    toggleForm(fields, title, data) {
      if (Object.keys(fields).length === 1) {
        for (var key in fields) {
          if (fields[key].name === "value") {
            fields[key].labelOverride = title;
          }
        }
      }

      let structureDefinition = null;

      for (var i in fields) {
        structureDefinition = i.substring(0, i.indexOf("."));
        break;
      }

      this.details = true;
      this.detailFields = fields;
      this.detailPath = null;
      this.detailTitle = title;
      this.detailRaw = data;
      this.extensionProfile = null;
      this.structureDefinition = structureDefinition;

      if (data && data.path) {
        this.detailPath = data.path.replace("Practitioner.", "");
      }

      if (data && data.type[0].code == "Extension") {
        this.extensionProfile = data.type[0].profile[0];
      }

      this.$refs.profileHeader.reset();
      this.$refs.detailsForm.changeFields(fields);
    }
  },
  mixins: [Capitalize, SectionsToDisplay, StructureDefinition, MobileLayout],
  name: "AddSections"
};
</script>
