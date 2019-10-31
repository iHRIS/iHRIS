<template>
  <v-text-field
    v-model="password"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
    :type="show ? 'text' : 'password'"
    :append-icon="show ? 'visibility' : 'visibility_off'"
    @click:append="show = !show"
  ></v-text-field>
</template>

<script>
export default {
  created() {
    this.password = this.value;
  },
  data() {
    return {
      password: null,
      rules: {
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
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
