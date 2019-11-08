<template>
  <v-container>
    <Alert ref="alert" />

    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <DynamicForm
          :fields="this.fields"
          name="login"
          v-on:successfulSubmit="submit"
          v-on:showFailedSubmit="failedSubmit"
          ref="loginForm"
          key="login"
          hideCancel="true"
          submitLabel="Login"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

import Alert from "@/components/Layout/Alert.vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    Alert,
    DynamicForm
  },
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null,
      fields: [
        {
          id: "username",
          max: 1,
          name: "username",
          required: true,
          type: "string"
        },
        {
          id: "password",
          max: 1,
          name: "password",
          required: true,
          type: "password"
        }
      ]
    };
  },
  methods: {
    failedSubmit() {
      this.$refs.alert.changeMessage("Invalid login credentials", "error");
    },
    submit() {
      let params = this.$refs.loginForm.getInputs();

      axios
        .post(this.config.backend + "/user/login", params)
        .then(response => {
          this.$store.state.authentication.username = response.data.username;
          this.$store.state.authentication.userId = response.data.userId;

          VueCookies.set("username", response.data.username);
          VueCookies.set("userId", response.data.userId);

          this.$router.push({
            name: "home",
            params: { login: true }
          });
        })
        .catch(() => {
          this.$refs.alert.changeMessage("Invalid login credentials", "error");
        });
    }
  }
};
</script>
