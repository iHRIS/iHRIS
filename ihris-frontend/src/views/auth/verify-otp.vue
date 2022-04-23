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
                <h4>Verify OTP</h4>
              </v-row>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <div style="display: flex; flex-direction: row">
                <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator="-"
                  :num-inputs="8"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
                />
              </div>
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
              <v-btn
                class="mx-2"
                @click="handleClearInput"
                outlined
                big
                color="primary"
              >
                Clear</v-btn
              >
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
  name: "verify-otp",
  data: function () {
    return {
      otpValue: "",
      loggingin: false,
      message: "",
      snackbar: false,
      absolute: true,
    };
  },
  methods: {
    handleOnComplete(value) {
      this.otpValue = value;
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
    handleSubmit() {
      this.loggingin = true;

      if (
        this.otpValue !== null ||
        (this.otpValue !== undefined && this.otpValue.length === 8)
      ) {
        var formData = new URLSearchParams();
        formData.append("otp", this.otpValue);
        formData.append("email", this.$store.state.user.email);
        fetch("/auth/verify-otp", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.ok) {
              this.message = "OTP verified successfully";
              this.snackbar = true;
              this.loggingin = false;
              this.$store.commit("user", data);
              this.$emit("loggedin", data.name[0].text);
              this.$router.push("/dashboard");
            } else {
              this.message = data.message;
              this.snackbar = true;
              this.loggingin = false;
            }
          });
      }
    },
  },
};
</script>

<style lang="sass">
.otp-input
  width: 40px
  height: 40px
  padding: 5px
  margin: 0 10px
  font-size: 20px
  border-radius: 4px
  border: 1px solid rgba(0, 0, 0, 0.3)
  text-align: center
  &.error
    border: 1px solid red !important

  &::-webkit-inner-spin-button,

  &::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
</style>
