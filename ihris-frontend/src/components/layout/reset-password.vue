<template>
  <v-main>
    <v-row align="center" justify="center" style="height: 500vh">
      <v-card min-width="500px">
        <v-card-title>Password Reset</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form
            v-model="isValid"
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
          <v-spacer />
          <v-btn outlined color="primary" class="text-caption" dark
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
  </v-main>
</template>
<script>
export default {
  name: "reset-password",
  props: ["data"],
  data: function () {
    return {
      show_pass: false,
      dialog: false,
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      isValid: false,
    };
  },
  computed: {
    isValid: function () {
      return (
        this.form.newPassword === this.form.confirmPassword &&
        this.form.newPassword.length > 0
      );
    },
  },
  methods: {
    submit: function () {
      if (this.isValid) {
        this.dialog = false;
        this.$store.dispatch("resetPassword", {
          email: this.data.email,
          newPassword: this.form.newPassword,
        });
      }
    },
  },
};
</script>