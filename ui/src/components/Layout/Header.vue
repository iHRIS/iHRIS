<template>
  <v-app-bar color="white" app clipped-left>
    <v-img :src="getLogo(icon)" contain max-height="40" max-width="40" />

    <v-toolbar-title class="headline">
      <span class="primary--text">iHRIS Manage</span>
      <span v-if="site"> | {{ site }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-for="item in accountMenu" v-bind:key="item.title">
      <v-btn text :to="item.link">{{ item.title }}</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { serverBus } from "../../main";

export default {
  created() {
    const config = require("@/config/config.json");

    this.icon = config.logo;
    this.site = config.site;
  },
  data() {
    let accountMenu = [
      {
        title: "Account",
        link: { name: "account" }
      }
    ];

    if (this.user) {
      accountMenu.push({
        title: "Change password",
        link: { name: "change-password" }
      });

      accountMenu.push({
        title: "Log out",
        link: { name: "logout" }
      });
    } else {
      accountMenu.push({
        title: "Log in",
        link: { name: "login" }
      });
    }

    return {
      accountMenu: accountMenu,
      config: [],
      icon: "",
      site: ""
    };
  },
  methods: {
    getLogo: function(path) {
      return path;
    },
    toggleDrawer: function() {
      serverBus.$emit("drawer", !this.drawer);
    }
  },
  props: ["user"]
};
</script>

<style scoped>
.tile:hover {
  background: #ddecf6;
}
</style>
