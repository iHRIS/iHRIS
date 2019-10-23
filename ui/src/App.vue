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
  data() {
    return {
      drawer: true,
      ihrisIcon: require("@/assets/logos/ihris.png"),
      menu: [
        {
          action: "home",
          avatar: "dashboard",
          link: "/",
          submenu: [],
          title: "Dashboard"
        },
        {
          action: "people",
          avatar: "people",
          submenu: [
            {
              link: "/people/search",
              title: "Search people"
            },
            {
              link: "/people/add",
              title: "Add people"
            }
          ],
          title: "People"
        },
        {
          action: "mhero",
          avatar: "phone",
          link: "/mhero",
          submenu: [],
          title: "mHero"
        }
      ]
    };
  },
  name: "App"
};
</script>
