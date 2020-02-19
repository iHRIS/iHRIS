<template>
  <v-text-field
    :id="generateFieldId"
    v-if="parseInt(max) <= 1"
    :label="label"
    outline
    :required="required"
    :rules="[rules.required]"
    :value="value"
    v-model="string"
    :hint="hint"
  ></v-text-field>
  <v-combobox
    :id="generateFieldId"
    v-else
    v-model="string"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    append-icon=""
    :rules="[rules.max, rules.required]"
    :required="required"
    outline
    :hint="hint"
  ></v-combobox>
</template>

<script>
export default {
  computed:{
    generateFieldId()
    {
      var sanitizedFieldName=this.fieldName.split(".").length>0 ? this.fieldName.replace(/\./g,"_") : this.fieldName;
      return (this.formName+"_"+sanitizedFieldName).toLowerCase();
    }
  },
  created() {
    this.string = this.value;
  },
  data() {
    return {
      rules: {
        max: value => {
          if (this.max == "*") {
            return true;
          }

          let max = parseInt(this.max);

          if (value && value.length > max) {
            return "Only " + max + " entries allowed.";
          }

          return true;
        },
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
  props: ["label", "max", "required", "value", "hint","formName","fieldName"]
};
</script>
