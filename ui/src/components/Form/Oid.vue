<template>
  <v-text-field
    v-model="oid"
    :label="label"
    outline
    :required="required"
    :rules="[rules.oid, rules.required]"
    :value="value"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      oid: null,
      rules: {
        oid: value => {
          const pattern = /urn:oid:[0-2](\.(0|[1-9][0-9]*))+/;
          return pattern.test(value) || "Must be an OID represented as a URI";
        },
        required: value => {
          return (
            (this.required && value) || !this.required || "Field is required"
          );
        }
      }
    };
  },
  methods: {
    getInput() {
      return this["oid"];
    }
  },
  props: ["label", "required", "value"]
};
</script>
