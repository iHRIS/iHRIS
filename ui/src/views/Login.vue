<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <DynamicForm
          :fields="this.fields"
          name="login"
          v-on:successfulSubmit="submit"
          v-on:failedSubmit="showFailedSubmit"
          ref="login"
          key="login"
          hideCancel="true"
          submitLabel="Login"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DynamicForm from "@/components/Form/DynamicForm.vue";

export default {
  components: {
    DynamicForm
  },
  created() {},
  data() {
    return {
      fields: [
        {
          id: "username",
          max: 1,
          name: "Username",
          required: true,
          type: "string"
        },
        {
          id: "password",
          max: 1,
          name: "Password",
          required: true,
          type: "password"
        }
      ]
    };
  }
};
</script>
