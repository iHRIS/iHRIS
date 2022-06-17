<template>
    <v-row align="center" justify="center" style="height: 80vh">
      <v-col>
        <v-row align="center" justify="center">
          <v-card class="py-8 px-4" min-width="500px">
            <v-card-title class="justify-center">
              <v-img
                  :src="'/images/iHRIS5LogoBig.png'"
                  align="center"
                  contain
                  justify="center"
                  max-height="132"
                  max-width="150"
              />
            </v-card-title>
            <v-card-text align="center" justify="center">
              <h2  class="text--primary font-weight-medium pt-3 pb-6">
                Change your password!<br/>
              </h2>
              <v-form
                  ref="resetPasswordForm"
                  lazy-validation
                  class="elevation-0"
              >
                <v-text-field
                    v-model="newPassword"
                    label="New Password"
                    outlined
                    dense
                    :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_pass ? 'text' : 'password'"
                    @click:append="show_pass = !show_pass"
                    prepend-icon="mdi-form-textbox-password"
                />
                <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    outlined
                    dense
                    :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_pass ? 'text' : 'password'"
                    @click:append="show_pass = !show_pass"
                    prepend-icon="mdi-form-textbox-password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-snackbar
                  v-model="snackbar"
                  :absolute="absolute"
                  color="secondary"
                  class="align-content-lg-space-between"
              >
                {{ message }}
                <template v-slot:action="{ attrs }">
                  <v-btn  v-bind="attrs" color="warning" text @click="snackbar = false"
                  >Close</v-btn>
                </template>
              </v-snackbar>
              <v-spacer></v-spacer>
              <v-btn
                  class="mx-2"
                  color="primary"
                  :loading="loggingin"
                  :disabled="loggingin"
                  @click="submit"
              >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
</template>
<script>
export default {
  name: "change-password",
  data: function () {
    return {
      show_pass: false,
      loggingin: false,
      message: "",
      snackbar: false,
      newPassword: "",
      confirmPassword: "",
      absolute: true,
    };
  },
  methods: {
    submit: function () {
      // eslint-disable-next-line
      let password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,32}$/;
      if (this.newPassword === "" || this.confirmPassword === "") {
        this.message = "All Fields are required!"
        this.snackbar = true
        this.signingin = false
      } else if (this.newPassword !== this.confirmPassword) {
        this.message = "Passwords do not match!"
        this.snackbar = true
        this.signingin = false
      } else if (!this.newPassword.match(password)) {
        this.message = "Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character!"
        this.snackbar = true
        this.signingin = false
      } else {
        this.loggingin = true;
        let formData = new URLSearchParams();
        formData.append("newPassword", this.newPassword);
        formData.append("confirmPassword", this.confirmPassword);
        const token = this.$route.query.token;
        const userId = this.$route.query.userId;
        console.log("userId",userId)
        fetch("auth/change-password?token=" + token + "&userId=" + userId, {
          method: "POST",
          body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
              this.loggingin = false;
              if (data.ok) {
                this.message = data.message;
                this.snackbar = true;
                setTimeout(() => {
                  this.$router.push("/");
                }, 800)
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
      }
    }
  }
}
</script>