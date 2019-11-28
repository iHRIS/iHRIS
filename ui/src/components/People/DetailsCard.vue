<template>
  <v-card class="mb-5">
    <v-card-title
      class="display-1 SectionTitle"
      @click="toogleSectionDetailDisplay"
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
        v-show="editButton || edit"
        v-if="!data[0]"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        class="error"
        v-show="editButton || edit"
        v-if="!data[0]"
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
                v-show="editButton || edit"
                v-if="data[0]"
                v-on:click="toggleForm(name)"
              >
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn
                fab
                class="error"
                v-show="editButton || edit"
                v-if="data[0]"
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
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
    DynamicForm
  },
  created() {
    let numEntries = parseInt(this.data.length);

    if (!isNaN(numEntries)) {
      this.allowMultiple = true;
    }

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
      this.editButton = true;
      let component = this;

      this.describe("Practitioner").then(response => {
        let data = [];
        let fields = [];

        if (component.data[0]) {
          fields = component.data[0];
        } else {
          fields = component.data;
        }

        for (var key in response) {
          if (key == component.name) {
            response[key].fields.then(element => {
              for (var subkey in element) {
                data.push({
                  id: element[subkey].name,
                  description: element[subkey].short,
                  max: element[subkey].max,
                  name: element[subkey].name,
                  options: element[subkey].options,
                  required: element[subkey].required,
                  type: element[subkey].type,
                  value: fields[element[subkey].name]
                    ? fields[element[subkey].name]
                    : null
                });
              }
            });
          }
        }

        this.fields = data;
        this.$refs.dynamicEditingForm.changeFields(data);
        this.dynamicFormKey++;
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
      this.$emit("deleteData", this.name, index);
    },
    showAddForm() {
      let fields = this.fields;

      fields.forEach(field => {
        field.value = null;
      });

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
      this.$emit(
        "saveData",
        this.$refs.dynamicEditingForm.getInputs(),
        this.$refs.dynamicEditingForm.getName(),
        this.currentIndex
      );

      this.cancel();
    },
    toggleForm(index) {
      let fields = this.fields;

      fields.forEach(field => {
        field.value = this.data[index][field.id];
      });

      this.$refs.dynamicEditingForm.changeFields(fields);

      this.currentIndex = index;
      this.dynamicFormKey++;
      this.editing = true;
      this.editButton = false;
      this.showMultiple = false;
    },
    toogleSectionDetailDisplay() {
      this.showSectionDetail = !this.showSectionDetail;
    }
  },
  mixins: [StructureDefinition],
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
