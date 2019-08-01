<template>
  <v-text-field
    v-model="id"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.format, rules.length, rules.required]"
  ></v-text-field>
  <v-combobox
    v-else
    v-model="id"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    :rules="[rules.format, rules.length, rules.required]"
    :required="required"
    outline
  ></v-combobox>
</template>

<script>
export default {
  created() {
    this.id = this.value;
  },
  data() {
    return {
      id: null,
      rules: {
        format: value => {
          const pattern = /[A-Za-z0-9\-.]/;

          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!pattern.test(value[i])) {
              return "Must be only upper- or lower-case ASCII letters.";
            }
          }

          return true;
        },
        length: value => {
          if (!Array.isArray(value)) {
            value = [value];
          }

          for (var i = 0; i < value.length; i++) {
            if (!value[i].length) {
              continue;
            }

            if (value.length < 1 && value.length > 64) {
              return "Field must be between 1 and 64 characters.";
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
      return this["id"];
    }
  },
  props: ["label", "max", "required", "value"]
};
</script>
