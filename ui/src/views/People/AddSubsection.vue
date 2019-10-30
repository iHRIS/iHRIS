<template>
  <v-container>
    <v-flex xs6 offset-xs3>
      <h1>Add a Person</h1>
      <p>
        To track a person in the database, whether an employee or a job
        applicant, add a record for that person. Certain information is required
        to start a new record. Once the record is generated, additional options
        for adding data about the person will become available. An HR Staff
        person or an HR Manager can add a new person to the system.
      </p>

      <v-alert v-model="alert" dismissable type="error">
        {{ error }}
      </v-alert>

      <IndividualInformationForm
        :practitioner="practitioner"
        :showSubforms="false"
        v-on:cancel="cancel"
        v-on:successfulSubmit="submit"
        v-on:failedSubmit="showFailedSubmit"
        ref="individualInformationForm"
      />
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      alert: false,
      config: null,
      error: "",
      inputs: [
        "firstName",
        "surname",
        "otherNames",
        "nationality",
        "residence"
      ],
      practitioner: {},
      rules: [v => !!v || "Required field"],
      surname: ""
    };
  },
  methods: {
    cancel() {
      this.$refs.individualInformationForm.reset();
    },
    showFailedSubmit() {
      this.error = "Invalid input, please correct all errors.";
      this.alert = true;
    },
    submit(input) {
      axios
        .post(this.config.server + "/practitioner/add", input)
        .then(response => {
          if (response.status === 201) {
            this.$router.push({
              name: "people-view",
              params: {
                id: response.data.id
              }
            });
          } else {
            this.error = "There was an error saving this data.";
            this.alert = true;
          }
        })
        .catch(error => {
          this.error = "Data not saved." + error;
          this.alert = true;
        });
    }
  }
};
</script>
