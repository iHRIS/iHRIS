<template>
  <div :id="applyFieldId">
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
          v-if="parseInt(max) <= 1"
          prepend-icon="event"
          readonly
          v-on="on"
          required="required"
          :rules="[rules.required]"
          :hint="hint"
          outline
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" header-color="primary" :locale="locale">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import GenerateFieldID from "@/mixins/GenerateFieldID.js";
import moment from "moment";
export default {
  mixins: [GenerateFieldID],
  computed: {
    applyFieldId() {
      return this.generateFieldId(this.formName, this.fieldName);
    }
  },
  created() {
    this.config = require("@/config/config.json");
    this.locale = this.config.locale;
    if (
      this.value != null &&
      moment(this.value, "YYYY-MM-DD", true).isValid()
    ) {
      this.date = this.value;
    }
  },
  data() {
    return {
      date: null,
      menu: false,
      locale: "en-US",
      visibility: true,
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
  props: ["label", "max", "required", "value", "hint", "formName", "fieldName"]
};
</script>
