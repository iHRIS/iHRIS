<template>
  <v-checkbox
    :label="label"
    :value="checked"
    v-model="boolean"
    :hint="hint"
    @change="hideEndDate" 
  ></v-checkbox>
</template>

<script>

export default {
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
    hideEndDate()
    {
      if(this.formName.toLowerCase()=="workhistory")
      {
        if(this.boolean)
        {
          document.getElementById(this.formName+"_End").style.visibility = "hidden";
        }
        else
        {
          document.getElementById(this.formName+"_End").style.visibility = "visible";
        }
        //serverBus.$emit("activeWorkHistory",this.boolean);
        
      }
      //if()
    }
  },
  props: ["checked", "label", "hint","formName"]
};
</script>
