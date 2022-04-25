<template>
  <v-main>
    <v-row align="center" justify="center" style="height: 100vh">
      <v-col>
        <v-row align="center" justify="center">
          <v-avatar size="100">
            <img src="/images/logo.png" alt="NHWR"
          /></v-avatar>
        </v-row>
        <v-row align="center" justify="center" class="mt-4 mb-4">
          <h2>National Health Workers Registry</h2>
        </v-row>

        <v-row align="center" justify="center">
          <v-card min-width="500px">
            <v-card-title class="info white--text">
              <v-row align="center" justify="center">
                <h4>Password Reset</h4>
              </v-row>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-form
                ref="resetPasswordForm"
                lazy-validation
                class="elevation-0"
              >
                <v-text-field
                  v-model="form.newPassword"
                  label="New Password"
                  outlined
                  :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_pass ? 'text' : 'password'"
                  @click:append="show_pass = !show_pass"
                  prepend-icon="mdi-form-textbox-password"
                />
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  outlined
                  :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_pass ? 'text' : 'password'"
                  @click:append="show_pass = !show_pass"
                  prepend-icon="mdi-form-textbox-password"
                />
              </v-form>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-snackbar
                v-model="snackbar"
                :absolute="absolute"
                color="secondary"
              >
                {{ message }}
                <v-btn color="warning" text @click="snackbar = false"
                  >Close</v-btn
                >
              </v-snackbar>
              <v-spacer></v-spacer>

              <v-btn
                class="mx-2"
                color="success"
                :loading="loggingin"
                :disabled="loggingin"
                @click="submit"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
export default {
  name: "reset-password",
  data: function () {
    return {
      show_pass: false,
      loggingin: false,
      message: "",
      snackbar: false,
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      absolute: true,
    };
  },

  methods: {
    submit: function () {
      this.loggingin = true;
      var formData = new URLSearchParams();
      formData.append("newPassword", this.form.newPassword);
      formData.append("confirmPassword", this.form.confirmPassword);

      const token = this.$route.query.token;
      const userId = this.$route.query.userId;

      fetch("auth/reset-password?token=" + token + "&userId=" + userId, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.loggingin = false;
          if (data.ok) {
            this.message = data.message;
            this.snackbar = true;
          } else {
            this.message = data.message;
            this.snackbar = true;
          }
        })

        .catch((error) => {
          this.loggingin = false;
          this.message = error;
          this.snackbar = true;
        });
    },
  },
};
</script>