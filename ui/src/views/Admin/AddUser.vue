<template>
  <v-container>
    <v-card>
`     <v-card-title>Add User</v-card-title>
      <v-card-text>
        <DynamicForm
          :fields="this.fields"
          name="addUser"
          v-on:cancel="cancel"
          v-on:successfulSubmit="submit"
          v-on:failedSubmit="showFailedSubmit"
          ref="addUser"
          key="addUser"
          submitLabel="Add"
        />
      </v-card-text>
    </v-card>
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
