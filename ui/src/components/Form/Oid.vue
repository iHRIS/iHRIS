<template>
  <v-text-field
    v-model="oid"
    :label="label"
    v-if="parseInt(max) <= 1"
    outline
    :required="required"
    :rules="[rules.oid, rules.required]"
    :value="value"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="oid"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.max, rules.oid, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.oid = this.value;
  },
  data() {
    return {
      oid: null,
      rules: {
        max: value => {
          if (this.max == "*") {
            return true;
          }

          let max = parseInt(this.max);

          if (value.length > max) {
            return "Only " + max + " entries allowed.";
          }

          return true;
        },
        oid: value => {
          const pattern = /urn:oid:[0-2](\.(0|[1-9][0-9]*))+/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be an OID represented as a URI";
            }
          }

          return true;
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
  props: ["label", "max", "required", "value"]
};
</script>
