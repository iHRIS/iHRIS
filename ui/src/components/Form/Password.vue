<template>
  <v-text-field
    v-model="password"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required, rules.matching]"
    :value="value"
    :type="show ? 'text' : 'password'"
    :append-icon="show ? 'visibility' : 'visibility_off'"
    @click:append="show = !show"
    @change="updatePassword"
    :hint="hint"
  ></v-text-field>
</template>

<script>
import { serverBus } from "@/main";

export default {
  created() {
    this.password = this.value;

    serverBus.$on("updatePassword", password => {
      this.matchedPassword = password;
    });
  },
  data() {
    return {
      matchedPassword: null,
      password: null,
      rules: {
        matching: value => {
          if (this.matching && value !== this.matchedPassword) {
            return "Passwords do not match.";
          }

          return true;
        },
        required: value => {
          if (this.required && !value) {
            return "Field is required";
          }

          return true;
        }
      },
      show: false
    };
  },
  methods: {
    getInput() {
      return this["password"];
    },
    updatePassword() {
      serverBus.$emit("updatePassword", this.getInput());
    }
  },
  props: ["label", "max", "required", "value", "matching", "hint"]
};
</script>
