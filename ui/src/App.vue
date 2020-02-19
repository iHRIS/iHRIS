<template>
  <v-app>
    <Header />

    <SideNavigation />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import SideNavigation from "./components/Layout/SideNavigation";

export default {
  components: {
    Footer,
    Header,
    SideNavigation
  },
  name: "App"
};
</script>

<style>
@import "./assets/css/printer-friendly.css";
</style>
