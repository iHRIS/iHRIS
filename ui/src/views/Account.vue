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
          v-on:successfulSubmit="submit"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { store } from "@/store.js";

import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  created() {
    this.config = require("@/config/config.json");
  },
  components: {
    Alert,
    DynamicForm
  },
  data() {
    return {
      config: null,
      fields: [
        {
          id: "currentPassword",
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
  },
  methods: {
    submit() {
      let params = this.$refs.changePasswordForm.getInputs();
      let payload = {
        id: store.state.authentication.userId,
        password: params["current password"],
        newPassword: params["new password"]
      };

      axios
        .post(this.config.backend + "/user/update", payload)
        .then(() => {
          this.$refs.changePasswordForm.reset();
          this.$refs.changePasswordAlert.changeMessage(
            "Password changed.",
            "success"
          );
        })
        .catch(() => {
          this.$refs.changePasswordAlert.changeMessage(
            "Unable to update password.",
            "error"
          );
        });
    }
  }
};
</script>
