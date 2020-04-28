<template>
  <v-container>
    <v-card>
      <v-card-title>Add Vacancy</v-card-title>
      <v-card-text>
        <DynamicForm ref="form" :fields="fields" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DynamicForm from "@/components/Form/DynamicForm.vue";
import StructureDefinition from "@/mixins/StructureDefinition.js";

export default {
  components: {
    DynamicForm
  },
  created() {
    this.created();
  },
  data() {
    return {
      fields: []
    };
  },
  methods: {
    created() {
      this.describe("iHRISPosition").then(response => {
        this.fields = response.fields;
        this.$refs.form.changeFields(this.fields);
      });
    }
  },
  mixins: [StructureDefinition]
};
</script>
