<template>
  <v-toolbar color="white" app clipped-left>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-img :src="ihrisIcon" contain max-height="40" max-width="40" />
    <v-toolbar-title class="headline primary--text">
      <span>iHRIS Manage</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="account" flat>
      Account
    </v-btn>
  </v-toolbar>
</template>

<script>
import { serverBus } from "../../main";

export default {
  data() {
    return {
      ihrisIcon: require("@/assets/logos/ihris.png")
    };
  },
  methods: {
    toggleDrawer: function() {
      serverBus.$emit("drawer", !this.drawer);
    }
  },
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  }
};
</script>
