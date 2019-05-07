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

      <v-form ref="form">
        <v-text-field
          v-model="firstName"
          label="First name"
          outline
          required
          :rules="rules"
        ></v-text-field>
        <v-text-field
          v-model="surname"
          label="Surname"
          outline
          required
          :rules="rules"
        ></v-text-field>
        <v-text-field
          v-model="otherNames"
          label="Other name(s)"
          outline
        ></v-text-field>
        <v-text-field
          v-model="nationality"
          label="Nationality"
          outline
          required
          :rules="rules"
        ></v-text-field>
        <v-text-field
          v-model="residence"
          label="Residence"
          outline
          required
          :rules="rules"
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
      alert: false,
      error: "",
      firstName: "",
      inputs: [
        "firstName",
        "surname",
        "otherNames",
        "nationality",
        "residence"
      ],
      otherNames: "",
      nationality: "",
      residence: "",
      rules: [v => !!v || "Required field"],
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
      if (this.$refs.form.validate()) {
        const input = this.getInputs();

        axios
          .post("/users/add", input)
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
      } else {
        this.error = "Invalid input, please correct all errors.";
        this.alert = true;
      }
    }
  }
};
</script>
