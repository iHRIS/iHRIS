<template>
  <v-form ref="form" v-on:resetForm="reset">
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
</template>

<script>
export default {
  created() {
    if (this.practitioner.firstName) {
      this.firstName = this.practitioner.firstName;
      this.nationality = this.practitioner.nationality;
      this.otherNames = this.practitioner.otherNames;
      this.residence = this.practitioner.residence;
      this.surname = this.practitioner.surname;
    }
  },
  data() {
    return {
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
      this.$emit("cancel");
    },
    getInputs() {
      let inputs = {};

      for (let i of this.inputs) {
        inputs[i] = this[i];
      }

      return inputs;
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("successfulSubmit", this.getInputs());
      } else {
        this.$emit("failedSubmit");
      }
    },
    updateData(practitioner) {
      this.firstName = practitioner.firstName;
      this.nationality = practitioner.nationality;
      this.otherNames = practitioner.otherNames;
      this.residence = practitioner.residence;
      this.surname = practitioner.surname;
    },
  },
  props: ["practitioner"]
};
</script>
