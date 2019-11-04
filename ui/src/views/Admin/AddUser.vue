<template>
  <v-container>
    <Alert ref="addUserAlert" />
    <v-card>
`     <v-card-title>Add User</v-card-title>
      <v-card-text>
        <DynamicForm
          :fields="this.fields"
          name="addUser"
          v-on:cancel="cancel"
          v-on:successfulSubmit="submit"
          v-on:failedSubmit="showFailedSubmit"
          ref="addUserForm"
          key="addUser"
          submitLabel="Add"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

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
          type: "password",
          matching: false
        },
        {
          id: "passwordRepeat",
          max: 1,
          name: "password",
          required: true,
          type: "password",
          matching: true
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.$refs.addUserForm.reset();
    },
    showFailedSubmit() {
      this.$refs.addUserAlert.changeMessage(
        "Could not add new user",
        "error"
      );
    },
    submit(data) {
      axios
        .post(this.config.backend + "/user/add", data)
        .then(response => {
          if (response.status === 201) {
            this.$refs.addUserAlert.changeMessage(
              "User added successfully.",
              "success"
            );

            this.$refs.addUserForm.reset();
          } else {
            this.$refs.addUserAlert.changeMessage(
              "There was an error saving this data.",
              "error"
            );
          }
        })
        .catch(error => {
          this.$refs.addUserAlert.changeMessage(
            "Data not saved. " + error,
            "error"
          );
        });
    }
  }
};
</script>
