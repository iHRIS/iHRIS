<template>
  <v-container>
    <Alert ref="alertBanner" v-show="showAlert" />

    <v-card>
      <v-card-title>Add Vacancy</v-card-title>
      <v-card-text>
        <DynamicForm ref="form" :fields="fields" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
    Alert,
    DynamicForm
  },
  created() {
    this.created();
  },
  data() {
    return {
      fields: [],
      showAlert: false
    };
  },
  methods: {
    created() {
      this.describe("iHRISPosition")
        .then(response => {
          this.fields = response.fields;
          this.$refs.form.changeFields(this.fields);
        })
        .catch(() => {
          this.showAlert = true;
          this.$refs.alertBanner.changeMessage(
            "Error loading form fields.",
            "error"
          );
        });
    }
  },
  mixins: [StructureDefinition]
};
</script>
