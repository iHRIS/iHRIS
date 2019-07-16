<template>
  <v-card class="mb-5">
    <v-card-title class="display-1">
      {{ this.name }}
      <v-spacer />
      <v-btn
        fab
        class="primary"
        @click.stop="editing = true; editButton = false"
        v-show="editButton"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-for="(value, name) in fields">
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

      <DynamicForm
        :fields="fields"
        v-on:cancel="cancel"
        v-on:successfulSubmit="submit"
        v-on:failedSubmit="showFailedSubmit"
        v-show="editing"
        ref="dynamicEditingForm"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    DynamicForm
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    cancel() {
    },
    showFailedSubmit() {
    },
    submit() {
    }
  },
  props: {
    editButton: {
      default: false,
      type: Boolean
    },
    fields: {
    },
    name: {
      default: null,
      type: String
    }
  }
};
</script>
