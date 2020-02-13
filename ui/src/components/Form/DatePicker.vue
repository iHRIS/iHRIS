<template >
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
      <template v-slot:activator="{ on }">
        <v-text-field
            v-model="date"
            :label="label"
            prepend-icon="event"
            readonly
            v-on="on"
            required="required"
            :rules="[rules.required]"
            :hint="hint"
          ></v-text-field>
      </template>
      <v-date-picker 
        v-model="date" 
        header-color="primary"
        :locale = "locale"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
      </v-date-picker>
      </v-menu>
</template>

<script>
export default {
  created() {
    this.config = require("@/config/config.json");
    this.locale = this.config.locale;
    if(this.value!=null)
    {
        this.date =  this.value;
    }
  },
  data() {
    return {
      date: null,
      menu: false,
      locale: "en-US",
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
      return this["date"];
    }
  },
  props: ["label", "max", "required", "value", "hint"]
};
</script>
<style scoped>
.dateBox {
    border-color: currentColor;
    border-bottom: 1px solid ;
    font-family: "Roboto",sans-serif;
    font-weight: 400;
    margin: 15px 0px;
    padding: 10px 0px;
    font-size: 18px;
}
.dateBox input {
    font-size: 18px;
    letter-spacing: normal;
    text-align: left;
    margin: 8px 0px;
    color: #000;
}
</style>
