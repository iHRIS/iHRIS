<template>
    <v-checkbox
      :id="generateFieldId"
      :label="label"
      :value="checked"
      v-model="boolean"
      :hint="hint"
      @change="runUIValidation" 
    ></v-checkbox>
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
    this.boolean = this.checked;
  },
  data() {
    return {
      boolean: false
    };
  },
  methods: {
    getInput() {
      return this["boolean"];
    },
    runUIValidation()
    {
      var validationParams={
        formName: this.formName,
        fiedlName: this.fieldName,
        value: this.boolean
      };
       this.$emit("validationTriggered",validationParams)
    }
  },
  props: ["checked", "label", "hint","formName","fieldName"],
 
};
</script>
