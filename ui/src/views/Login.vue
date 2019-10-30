<template>
  <v-container>
    <DynamicForm
      :fields="this.fields"
      name="login"
      v-on:cancel="cancel"
      v-on:successfulSubmit="submit"
      v-on:failedSubmit="showFailedSubmit"
      ref="login"
      key="login"
    />
  </v-container>
</template>

<script>
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    DynamicForm
  },
  created() {
  },
  data() {
    return {
      fields: []
    };
  }
};
</script>
