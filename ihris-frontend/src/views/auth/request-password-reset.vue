<template>
  <v-main>
    <v-row align="center" justify="center" style="height: 500vh">
      <v-card min-width="500px">
        <v-card-title>Request Password Reset</v-card-title>
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
  name: "request-password-reset",
  props: ["data"],
  data: function () {
    return {
      show_pass: false,
      dialog: false,
      form: {
        email: "",
      },
      isValid: false,
    };
  },
  computed: {},
};
</script>