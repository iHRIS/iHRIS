<template>
  <v-app>
    <v-toolbar color="white" app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-img :src="ihrisIcon" contain max-height="40" max-width="40" />
      <v-toolbar-title class="headline primary--text">
        <span>iHRIS Manage</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="account" flat>
        Account
      </v-btn>
    </v-toolbar>

    <v-layout row wrap fill-height>
      <v-navigation-drawer
        v-model="drawer"
        app
        class="primary darken-1 white--text"
        clipped
      >
        <v-container centered class="px-1 text-uppercase font-weight-bold">
          <v-list class="primary darken-1 white--text font-weight-bold">
            <v-list-tile active-class="primary darken-2" href="/">
              <v-list-tile-avatar>
                <v-icon class="white--text">dashboard</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <strong>Dashboard</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile active-class="primary darken-2" href="/settings">
              <v-list-tile-avatar>
                <v-icon class="white--text">settings</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <strong>Configuration</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-navigation-drawer>

      <v-content>
        <router-view />
      </v-content>
    </v-layout>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import SideNavigation from "./components/Layout/SideNavigation";

export default {
  components: {
    Footer
  },
  data() {
    return {
      drawer: true,
      ihrisIcon: require("@/assets/logos/ihris.png")
    };
  },
  name: "App"
};
</script>
