<template>
  <div :id="generateFieldId">
    <v-datetime-picker
          :label="label"
          v-model="datetime"
          timePickerFormat="ampm"
          :width="width"
          :format="format"
          ></v-datetime-picker>
    </div>
</template>

<script>
export default {
  computed:{
    generateFieldId()
    {
      //console.log("FieldName.length")
      var sanitizedFieldName=this.fieldName.split(".").length>0 ? this.fieldName.replace(/\./g,"_") : this.fieldName;
      return (this.formName+"_"+sanitizedFieldName).toLowerCase();
    }

  },
  created() {
    this.config = require("@/config/config.json");
    this.locale = this.config.locale;
    this.datetime = this.value;
  },
  data() {
    return {
      datetime: null,
      locale: "en-US",
      format:"YYYY-MM-DDTHH:mm:ssZ",
      width: 290,
      rules: {
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
      return this["datetime"];
    }
  },
  props: ["label", "max", "required", "value", "hint","formName","fieldName"]
};
</script>
