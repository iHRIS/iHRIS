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
                <h4>Request Password Reset</h4>
              </v-row>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-form
                v-model="isValid"
                ref="requestPasswordResetForm"
                lazy-validation
                class="elevation-0"
              >
                <v-text-field v-model="form.email" label="Email" filled />
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
  name: "request-password-reset",
  data: function () {
    return {
      dialog: false,
      loggingin: false,
      message: "",
      snackbar: false,
      form: {
        email: "",
      },
      absolute: true,
      
      
    };
  },
  methods: {
    submit: function () {
      this.loggingin = true;
      var formData = new URLSearchParams();
      formData.append("email", this.form.email);
      this.$refs.requestPasswordResetForm.validate();
      fetch("/auth/request-password-reset", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.loggingin = false;
          console.log(data);
          // if (data.success) {
          //   this.message = data.message;
          //   this.snackbar = true;
          // } else {
          //   this.message = data.message;
          //   this.snackbar = true;
          // }
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