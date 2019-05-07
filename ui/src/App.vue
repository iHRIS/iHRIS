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

    <template>
      <v-layout row wrap fill-height>
        <v-navigation-drawer
          v-model="drawer"
          app
          class="primary darken-1 white--text"
          clipped
        >
          <v-container centered class="px-1">
            <v-list class="primary darken-1 white--text">
              <v-list-group
                v-for="item in menu"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.avatar"
                no-action
              >
                <template v-slot:activator>
                  <v-list-tile active-class="primary darken-2" :to="item.link">
                    <v-list-tile-content>
                      <v-list-tile-title
                        class="text-uppercase font-weight-bold"
                      >
                        {{ item.title }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                <v-list-tile
                  v-for="subItem in item.submenu"
                  :key="subItem.title"
                  @click.stop=""
                  :to="subItem.link"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-container>
        </v-navigation-drawer>

        <v-content>
          <router-view />
        </v-content>
      </v-layout>
    </template>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Layout/Footer";

export default {
  components: {
    Footer
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
              link: "/people",
              title: "Search people"
            },
            {
              link: "/people/add",
              title: "Add people"
            },
            {
              link: "/people/review-applications",
              title: "Review applications"
            }
          ],
          title: "People"
        },
        {
          action: "settings",
          avatar: "settings",
          link: "/settings",
          submenu: [],
          title: "Settings"
        }
      ]
    };
  },
  name: "App"
};
</script>
