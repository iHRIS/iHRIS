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
        v-if="Array.isArray(data)"
        v-show="!editing && showSectionDetail"
      >
        <div v-for="(value, name) in data" v-bind:key="name">
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
                v-if="Array.isArray(data)"
                v-on:click="toggleForm(name)"
              >
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn
                fab
                class="error"
                v-show="editButton && edit"
                v-if="Array.isArray(data)"
                v-on:click="deleteItem(name)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-layout>

            <v-simple-table>
              <tbody>
                <tr v-for="(data, fieldIndex) in value" v-bind:key="fieldIndex">
                  <td :width="headerWidth" class="font-weight-bold">
                    {{ fieldIndex | sentenceCase }}
                  </td>
                  <td>{{ data | separateByCommas }}</td>
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
              <v-flex xs8 v-for="(data, index) in value" v-bind:key="index">
                {{ data | separateByCommas }}
              </v-flex>
            </v-layout>

            <v-divider class="pb-3" />
          </div>
        </div>
      </v-card-text>

      <v-card-text v-show="!editing" v-else-if="typeof data !== 'object'">
        <v-simple-table>
          <tbody>
            <tr>
              <td :width="headerWidth" class="font-weight-bold">
                {{ this.name | sentenceCase }}
              </td>
              <td>{{ data }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>

      <v-card-text v-show="!editing" v-else>
        <v-simple-table>
          <tbody>
            <tr v-for="(value, name) in data" v-bind:key="name">
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
import DynamicForm from "@/components/Form/DynamicForm.vue";
import Practitioner from "@/mixins/Practitioner.js";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
    DynamicForm
  },
  created() {
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

      case "identifier":
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

      case "telecom":
        this.subheader = "use";
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
      showSectionDetail: true,
      alert: {
        message: null,
        show: false,
        type: null
      },
      allowMultiple: false,
      currentIndex: null,
      dynamicFormKey: 0,
      editButton: false,
      editing: false,
      fields: [],
      headerWidth: "30%",
      profile: null,
      showMultiple: true,
      subheader: null
    };
  },
  methods: {
    cancel() {
      this.editing = false;
      this.editButton = true;
      this.showMultiple = true;
    },
    deleteItem(index) {
      this.$emit("deleteData", this.name, index, this.profile);
    },
    showAddForm() {
      let fields = this.fields;

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

      if (Object.keys(inputs).length === 1 && inputs[name]) {
        inputs = inputs[name];
      }

      this.$emit("saveData", inputs, name, this.currentIndex, this.profile);

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
          let field = fields[key];
          fields[key].value = this.data[index][field.title];
        }
      }

      this.$refs.dynamicEditingForm.changeFields(fields);

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
