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
                <h4>Sign In</h4>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="username"
                label="Email Address"
                required
                prepend-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_pass ? 'text' : 'password'"
                @click:append="show_pass = !show_pass"
                prepend-icon="mdi-form-textbox-password"
                @keyup.native.enter="submit"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
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

              <v-btn
                class="mx-2"
                @click="forgotPassword"
                outlined
                small
                color="primary"
              >
                Forgot Password?</v-btn
              >
              <v-spacer></v-spacer>

              <v-btn
                color="success"
                :loading="loggingin"
                :disabled="loggingin"
                @click="submit"
                >Login</v-btn
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
  name: "auth-button",
  props: ["data", "big"],
  data: function () {
    return {
      dialog: false,
      username: "",
      password: "",
      show_pass: false,
      loggingin: false,
      message: "",
      snackbar: false,
      absolute: true,
    };
  },

  methods: {
    submit() {
      this.loggingin = true;
      var formData = new URLSearchParams();
      formData.append("username", this.username);
      formData.append("password", this.password);
      fetch("auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      })
        .then((response) => {
          this.loggingin = false;
          if (response.ok) {
            response
              .json()
              .then((data) => {
                this.dialog = false;
                //this.absolute=false
                this.snackbar = true;
                this.message = "Login successful";
                this.$emit("loggedin", data.name);
                this.$router.push({
                  name: "dashboard",
                });
              })
              .catch((err) => {
                this.loggingin = false;
                this.snackbar = true;
                this.message = err.message;
              });
          } else {
            //this.absolute=true
            this.message = "Username or password are incorrect";
            this.snackbar = true;
            this.loggingin = false;
          }
        })
        .catch((err) => {
          console.log(err);
          //this.absolute=true
          this.loggingin = false;
          this.snackbar = true;
          this.message = "Login failed: " + err.message;
        });
    },
    forgotPassword() {
      this.$router.push({
        path: "/forgot-password",
      });
    },
  },
};
</script>