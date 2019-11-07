<template>
  <v-container>
    <Alert ref="changePasswordAlert" />
    <v-card>
      <v-card-title>Change Password</v-card-title>
      <v-card-text>
        <DynamicForm
          :fields="this.fields"
          name="changePassword"
          ref="changePasswordForm"
          key="changePassword"
          hideCancel="true"
          submitLabel="Update"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    Alert,
    DynamicForm
  },
  data() {
    return {
      config: null,
      fields: [
        {
          id: "password",
          max: 1,
          name: "current password",
          required: true,
          type: "password"
        },
        {
          id: "password",
          max: 1,
          name: "new password",
          required: true,
          type: "password",
          matching: false
        },
        {
          id: "passwordRepeat",
          max: 1,
          name: "new password",
          required: true,
          type: "password",
          matching: true
        }
      ]
    };
  }
};
</script>
