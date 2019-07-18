<template>
  <v-text-field
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
    v-model="string"
  ></v-text-field>
</template>

<script>
export default {
  created() {
    this.string = this.value;
  },
  data() {
    return {
      rules: {
        required: value => {
          if (!this.required || value) {
            return true;
          }

          return "Field is required";
        }
      },
      string: null
    };
  },
  methods: {
    getInput() {
      return this["string"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
