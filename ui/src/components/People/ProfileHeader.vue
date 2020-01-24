<template>
  <v-layout row wrap class="pb-5">
    <v-flex xs1 v-if="practitioner.photo">
      <v-img :src="getProfilePicture()" contain />
    </v-flex>
    <v-flex xs6 class="display-2 text-xs-left pl-3" v-if="practitioner.name">
      {{ name }}<br />
      <v-chip
        class="ma-2"
        :color="active.color"
        text-color="white"
        @click="changeActive"
      >
        <v-avatar left>
          <v-icon>{{ active.icon }}</v-icon>
        </v-avatar>

        {{ active.text }}
      </v-chip>
    </v-flex>
    <v-flex xs4 offset-xs1 class="pr-3">
      <Alert ref="alert" />
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

import Alert from "@/components/Layout/Alert.vue";

export default {
  components: {
    Alert
  },
  computed: {
    active() {
      // active is defined as active unless it is explicitly set to false per the structure definition
      if (this.practitioner.active === false) {
        return {
          color: "red",
          text: "Inactive",
          icon: "mdi-close-circle-outline"
        };
      }

      return {
        color: "green",
        text: "Active",
        icon: "mdi-checkbox-marked-circle"
      };
    },
    name() {
      let name = "";

      if (this.practitioner.name[0].prefix) {
        name += this.practitioner.name[0].prefix[0] + " ";
      }

      if (this.practitioner.name[0].given) {
        name += this.practitioner.name[0].given[0] + " ";
      }

      if (this.practitioner.name[0].family) {
        name += this.practitioner.name[0].family + " ";
      }

      if (this.practitioner.name[0].suffix) {
        name += this.practitioner.name[0].suffix[0] + " ";
      }

      return name;
    }
  },
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null
    };
  },
  methods: {
    changeActive() {
      if (this.edit) {
        let practitioner = this.practitioner;
        practitioner.active = this.practitioner.active === false ? true : false;

        axios
          .post(this.config.backend + "/practitioner/edit", practitioner)
          .then(response => {
            if (response.status == 201) {
              this.$emit("changePractitioner", practitioner);
            }
          });
      }
    },
    changeMessage(message, type) {
      this.$refs.alert.changeMessage(message, type);
    },
    getProfilePicture() {
      return this.practitioner.photo[0].url;
    },
    reset() {
      this.$refs.alert.reset();
    }
  },
  props: ["edit", "practitioner"]
};
</script>
