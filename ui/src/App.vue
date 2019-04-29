<template>
  <v-app>
    <Header />

    <v-content>
      <v-layout row wrap fill-height>
        <v-flex md2 class="primary darken-1 white--text">
          <SideNavigation />
        </v-flex>
        <v-flex md10>
          <router-view />
        </v-flex>
      </v-layout>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideNavigation from "./components/SideNavigation";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    SideNavigation
  },
  data() {
    return {
      //
    };
  }
};
</script>
