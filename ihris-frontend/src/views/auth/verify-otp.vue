<template>
  <div>
    <div class="ma-auto position-relative" style="max-width: 300px">
      <v-otp-input
        v-model="otp"
        :disabled="loading"
        @finish="onFinish"
      ></v-otp-input>
      <v-overlay absolute :value="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </div>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "otp-input",
  props: ["otp"],
  data: function () {
    return {
      loading: false,
      expectedOtp: "",
      snackbar: false,
      snackbarColor: "",
      text: "",
    };
  },
  computed: {
    otpValue: function () {
      return this.otp.value;
    },
  },
  methods: {
    onFinish: function () {
      this.loading = true;
      this.expectedOtp = this.otpValue;
      this.text = "Verifying OTP...";
      this.snackbarColor = "primary";
      this.snackbar = true;
      setTimeout(() => {
        this.loading = false;
        this.text = "OTP verified";
        this.snackbarColor = "success";
        this.snackbar = true;
      }, 2000);
    },
  },
};
</script>