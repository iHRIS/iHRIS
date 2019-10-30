<template>
  <v-card class="mb-5">
    <v-card-title class="display-1">
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
    <v-card-text
      v-for="(value, name) in data"
      v-show="!editing"
      v-bind:key="name"
    >
      <div v-if="Array.isArray(value) || typeof value === 'object'">
        <div v-if="Number.isInteger(name)">
          <v-layout row align-baseline>
            <v-flex xs4 class="primary--text text-uppercase">
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
          <div v-for="(data, fieldIndex) in value" v-bind:key="fieldIndex">
            <div v-if="data">
              <v-layout row>
                <v-flex xs4 class="font-weight-bold">
                  {{ fieldIndex | sentenceCase }}
                </v-flex>
                <v-flex xs8>{{ data | separateByCommas }}</v-flex>
              </v-layout>

              <v-divider class="pb-3" />
            </div>
          </div>
        </div>
        <div v-else>
          <v-layout row>
            <v-flex xs4 class="font-weight-bold">
              {{ name | sentenceCase }}
            </v-flex>
            <v-flex xs8 v-for="(data, index) in value" v-bind:key="index">
              {{ data | separateByCommas}}
            </v-flex>
          </v-layout>

          <v-divider class="pb-3" />
        </div>
      </div>
      <div v-else>
        <v-layout row>
          <v-flex xs4 class="font-weight-bold">
            {{ name | sentenceCase }}
          </v-flex>
          <v-flex xs8>{{ value }}</v-flex>
        </v-layout>

        <v-divider class="pb-3" />
      </div>
    </v-card-text>

    <v-card-text v-show="allowMultiple && showMultiple && edit">
      <v-btn
        class="font-weight-bold primary--text text-uppercase"
        text
        flat
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
          if (response.hasOwnProperty(key) && key == component.name) {
            response[key].fields.then(element => {
              for (var subkey in element) {
                if (element.hasOwnProperty(subkey)) {
                  data.push({
                    id: element[subkey].name,
                    description: element[subkey].short,
                    max: element[subkey].max,
                    name: element[subkey].name,
                    options: element[subkey].options,
                    required: element[subkey].required,
                    type: element[subkey].type,
                    value: fields[element[subkey].name] ? fields[element[subkey].name] : null
                  });
                }
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
      this.$emit(
        "deleteData",
        this.name,
        index
      );
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
