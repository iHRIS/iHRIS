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

      {{ results }}

      <v-form ref="form">
        <v-text-field
          v-model="firstName"
          label="First name"
          outline
        ></v-text-field>
        <v-text-field v-model="surname" label="Surname" outline></v-text-field>
        <v-text-field
          v-model="otherName"
          label="Other name(s)"
          outline
        ></v-text-field>
        <v-text-field
          v-model="nationality"
          label="Nationality"
          outline
        ></v-text-field>
        <v-text-field
          v-model="residence"
          label="Residence"
          outline
        ></v-text-field>

        <v-layout align-center justify-end fill-height>
          <v-btn @click="cancel">cancel</v-btn>
          <v-btn @click="submit" class="primary">submit</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      inputs: ["firstName", "surname", "otherName", "nationality", "residence"],
      otherName: "",
      nationality: "",
      residence: "",
      results: "",
      surname: ""
    };
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
    },
    getInputs() {
      let inputs = {};

      for (let i of this.inputs) {
        inputs[i] = this[i];
      }

      return inputs;
    },
    submit() {
      const input = this.getInputs();

      axios
        .post("/users/add", input)
        .then(response => {
          console.log(response);

          if (response.data.ok == "1") {
            this.results = "Data saved.";
          }
        })
        .catch(error => {
          this.results = "Data not saved." + error;
        });
    }
  }
};
</script>
