<template>
  <v-card class="mb-5">
    <v-card-title
      class="display-1 SectionTitle"
      @click="toggleSectionDetailDisplay"
    >
      {{ this.name | sentenceCase }}
      <v-spacer />
      <v-btn
        fab
        class="primary"
        @click.stop="
          editing = true;
          editButton = false;
        "
        v-show="editButton && edit"
        v-if="!Array.isArray(data)"
        v-on:click="toggleForm(name)"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        class="error"
        v-show="editButton && edit"
        v-if="!Array.isArray(data)"
        v-on:click="deleteItem()"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-title>
    <transition name="fade">
      <v-card-text
        v-if="Array.isArray(sanitized)"
        v-show="!editing && showSectionDetail"
      >
        <div v-for="(value, name) in sanitized" v-bind:key="name">
          <div v-if="Number.isInteger(name)">
            <v-layout row align-baseline>
              <v-flex xs4 class="primary--text text-uppercase pl-5">
                {{ value[subheader] }}
              </v-flex>

              <v-spacer />

              <v-btn
                fab
                class="primary"
                v-show="editButton && edit"
                v-if="Array.isArray(sanitized)"
                v-on:click="toggleForm(name)"
              >
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn
                fab
                class="error"
                v-show="editButton && edit"
                v-if="Array.isArray(sanitized)"
                v-on:click="deleteItem(name)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-layout>

            <v-simple-table>
              <tbody>
                <tr
                  v-for="(sanitized, fieldIndex) in value"
                  v-bind:key="fieldIndex"
                >
                  <td :width="headerWidth" class="font-weight-bold">
                    {{ fieldIndex | sentenceCase }}
                  </td>
                  <td>{{ sanitized | separateByCommas }}</td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-divider class="pb-3" />
          </div>
          <div v-else>
            <v-layout row>
              <v-flex xs4 class="font-weight-bold">
                {{ name | sentenceCase }}
              </v-flex>
              <v-flex
                xs8
                v-for="(sanitized, index) in value"
                v-bind:key="index"
              >
                {{ sanitized | separateByCommas }}
              </v-flex>
            </v-layout>

            <v-divider class="pb-3" />
          </div>
        </div>
      </v-card-text>

      <v-card-text v-show="!editing" v-else-if="typeof sanitized !== 'object'">
        <v-simple-table>
          <tbody>
            <tr>
              <td :width="headerWidth" class="font-weight-bold">
                {{ this.name | sentenceCase }}
              </td>
              <td>{{ sanitized }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>

      <v-card-text v-show="!editing" v-else>
        <v-simple-table>
          <tbody>
            <tr v-for="(value, name) in sanitized" v-bind:key="name">
              <td :width="headerWidth" class="font-weight-bold">
                {{ name | sentenceCase }}
              </td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-simple-table>

        <v-divider class="pb-3" />
      </v-card-text>
    </transition>
    <v-card-text
      v-show="allowMultiple && showMultiple && edit && showSectionDetail"
    >
      <v-btn
        class="font-weight-bold primary--text text-uppercase"
        text
        depressed
        @click.stop="showAddForm"
      >
        Add Another
      </v-btn>
    </v-card-text>

    <v-card-text v-show="editing">
      <v-alert v-model="alert.show" dismissable :type="alert.type">
        {{ alert.message }}
      </v-alert>

      <DynamicForm
        :fields="this.fields"
        :name="this.name"
        v-on:cancel="cancel"
        v-on:successfulSubmit="submit"
        v-on:failedSubmit="showFailedSubmit"
        ref="dynamicEditingForm"
        :key="dynamicFormKey"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import DynamicForm from "@/components/Form/DynamicForm.vue";
import Practitioner from "@/mixins/Practitioner.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  asyncComputed: {
    async sanitized() {
      let sanitized = [];
      let data = JSON.parse(JSON.stringify(this.data));

      if (!Array.isArray(data)) {
        return data;
      }

      for (var i in data) {
        let element = data[i];

        for (var j in element) {
          // never render id or resourceType fields
          if (j === "id" || j === "resourceType") {
            delete element[j];
            continue;
          }

          // ignore practitioner and meta fields for work history card
          if (
            this.name === "workHistory" &&
            (j === "practitioner" || j === "meta")
          ) {
            delete element[j];
            continue;
          }

          let field = element[j];

          if (field.reference) {
            let reference = field.reference.split("/");

            let result = await axios.get(
              this.config.backend +
                "/structure-definition/get/" +
                reference[0] +
                "/" +
                reference[1]
            );
            let text = "";

            // look for a name, title, or text field
            if (result.data.name) {
              text = result.data.name;
            } else if (result.data.title) {
              text = result.data.title;
            } else {
              text = result.data.text;
            }

            element[j] = text;
          } else if (typeof field === "object" && field !== null) {
            if (field.start) {
              element[j] = field.start + " - ";

              if (field.end) {
                element[j] += field.end;
              } else {
                element[j] += "present";
              }
            } else if (field.text) {
              element[j] = field.text;
            }
          }
        }

        sanitized.push(element);
      }

      return sanitized;
    }
  },
  components: {
    DynamicForm
  },
  created() {
    this.config = require("@/config/config.json");

    switch (this.name) {
      case "address":
        this.subheader = "use";
        break;

      case "communication":
        this.subheader = "text";
        break;

      case "contained":
        this.subheader = "language";
        break;

      case "Personal identifier":
        this.subheader = "use";
        break;

      case "meta":
        this.subheader = "versionId";
        break;

      case "name":
        this.subheader = "use";
        break;

      case "photo":
        this.subheader = "title";
        break;

      case "Personal telephone number":
      case "telecom":
        this.subheader = "system";
        break;

      case "text":
        this.subheader = "status";
        break;
    }

    if (this.edit) {
      this.getSections().then(sections => {
        // find the matching section, that will be the fields
        for (var i in sections) {
          let section = sections[i];

          if (
            section.id === this.name ||
            section.id.endsWith("." + this.name) ||
            section.label === this.name
          ) {
            this.key = section.id.substring(section.id.lastIndexOf(".") + 1);

            if (section.max === "*") {
              this.allowMultiple = true;
            }

            let structureDefinition = section.type[0].code;

            if (
              structureDefinition === "Extension" &&
              section.type[0].profile &&
              section.type[0].profile[0]
            ) {
              let profile = section.type[0].profile[0];
              this.profile = profile;

              structureDefinition = profile.slice(profile.lastIndexOf("/") + 1);
            }

            this.showForm(this.name, structureDefinition, section).then(
              fields => {
                this.editButton = true;
                this.fields = fields;
              }
            );

            break;
          }
        }
      });
    }
  },
  data() {
    return {
      alert: {
        message: null,
        show: false,
        type: null
      },
      allowMultiple: false,
      config: null,
      currentIndex: null,
      dynamicFormKey: 0,
      editButton: false,
      editing: false,
      fields: [],
      headerWidth: "30%",
      key: null,
      profile: null,
      showMultiple: true,
      showSectionDetail: true,
      subheader: null
    };
  },
  methods: {
    cancel() {
      this.editing = false;
      this.editButton = true;
      this.showMultiple = true;
      this.$refs.dynamicEditingForm.reset();

      let fields = this.fields;

      for (var i in fields) {
        fields[i].value = null;
      }
    },
    deleteItem(index) {
      let names = {
        key: this.key,
        name: this.name
      };

      this.$emit("deleteData", names, index, this.profile);
    },
    showAddForm() {
      this.$refs.dynamicEditingForm.reset();
      let fields = this.fields;

      for (var i in fields) {
        fields[i].value = null;
      }

      this.$refs.dynamicEditingForm.changeFields(fields);

      this.currentIndex = -1;
      this.dynamicFormKey++;
      this.editing = true;
      this.editButton = false;
      this.showMultiple = false;
    },
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;
    },
    showFailedSubmit() {
      this.alert.message = "Invalid input, please correct all errors.";
      this.alert.type = "error";
      this.alert.show = true;
    },
    submit() {
      let inputs = this.$refs.dynamicEditingForm.getInputs();
      let name = this.$refs.dynamicEditingForm.getName();
      let names = {
        key: this.key,
        name: name
      };

      if (Object.keys(inputs).length === 1 && inputs[name]) {
        inputs = inputs[name];
      }

      this.$emit("saveData", inputs, names, this.currentIndex, this.profile);

      this.cancel();
    },
    toggleForm(index) {
      let fields = this.fields;
      let key = null;

      if (Object.keys(fields).length === 1) {
        for (key in fields) {
          if (fields[key].name === "value") {
            fields[key].labelOverride = this.name;
          }

          fields[key].value = this.data;
        }
      } else {
        for (key in fields) {
          // if there is more than one period, then we need to flatten the data
          let field = fields[key];
          let value = null;

          if (key.indexOf(".") > 1) {
            value = _.get(this.data[index], field.title.slice("."));
          } else {
            value = this.data[index][field.title];
          }

          fields[key].value = value;
        }
      }

      this.currentIndex = index;
      this.dynamicFormKey++;
      this.editing = true;
      this.editButton = false;
      this.showMultiple = false;
    },
    toggleSectionDetailDisplay() {
      this.showSectionDetail = !this.showSectionDetail;
    }
  },
  mixins: [Practitioner, StructureDefinition],
  props: {
    data: {},
    edit: {
      default: false,
      type: Boolean
    },
    name: {
      default: null,
      type: String
    }
  }
};
</script>
<style scoped>
.SectionTitle {
  cursor: pointer;
}
.error {
  margin-left: 5px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave {
}
.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
</style>
