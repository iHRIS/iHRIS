<template>
  <v-toolbar color="white" app clipped-left>
    <v-img :src="icon" contain max-height="40" max-width="40" />
    <v-toolbar-title class="headline">
      <span class="primary--text">iHRIS Manage</span>
      <span v-if="site"> | {{ site }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
          Account
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in accountMenu"
          :key="index"
          @click.stop=""
          class="tile"
          :to="item.link"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { serverBus } from "../../main";

export default {
  created() {
    const config = require("../../../config/config.json");
    this.icon = require(config.logo);
    this.site = config.site;
  },
  data() {
    let accountMenu = [];

    if (this.user) {
      accountMenu = [
        {
          title: "Change password",
          link: "/change-password"
        },
        {
          title: "Log out",
          link: "/logout"
        }
      ];
    } else {
      accountMenu = [
        {
          title: "Log in",
          link: "/login"
        }
      ];
    }

    return {
      accountMenu: accountMenu,
      icon: "",
      site: ""
    };
  },
  methods: {
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
