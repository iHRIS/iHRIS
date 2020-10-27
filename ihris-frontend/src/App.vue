<template>
  <v-app id="top">
    <the-header app :header="header" />
    <the-navigation app :nav="nav" />

    <v-content>
      <v-snackbar
        app
        class="mt-12"
        v-model="$store.state.message.active"
        :color="$store.state.message.type"
        :timeout="$store.state.message.timeout"
        top
        multi-line
        >
        {{ $store.state.message.text }}
          <v-btn icon dark @click="$store.commit('closeMessage')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-snackbar>

      <router-view :key="$route.path"></router-view>
      <router-view v-if="$store.state.user.loggedin" name="homeNav" :nav="nav"></router-view>
    </v-content>

    <the-footer :footer="footer" />
  </v-app>
</template>

<style>
.ihris-sections-menu {
  position: sticky;
  top: 0;
  z-index: 2;
}
.ihris-sections-menu::before {
  display: block;
  content: " ";
  margin-top: -70px;
  height: 70px;
  visibility: hidden;
  pointer-events: none;
}
.ihris-section::before {
  display: block;
  content: " ";
  margin-top: -70px;
  height: 70px;
  visibility: hidden;
  pointer-events: none;
}
</style>

<script>
import TheHeader from "./components/layout/the-header"
import TheNavigation from "./components/layout/the-navigation"
import TheFooter from "./components/layout/the-footer"

export default {
  name: "App",
  data: () => ({
    header: {
      title: false,
      site: null,
      logo: "iHRIS5Logo.png",
      auths: [],
    },
    footer: {
      links: []
    },
    nav: {
      active: null,
      menu: {},
      auths: []
    }
  }),
  components: {
    TheHeader,
    TheNavigation,
    TheFooter
  },
  created: function() {
    // make sure we're user has been created in session (logged in or not)
    fetch("/auth").then(()=> {

      fetch("/config/site").then(response => {
        response.json().then(data => {
          if (data.hasOwnProperty("security") && data.security.hasOwnProperty("disabled")) {
            this.$store.commit('securityOff', data.security.disabled)
          }
          if (data.hasOwnProperty("title")) this.header.title = data.title
          if (data.hasOwnProperty("site")) this.header.site = data.site
          if (data.hasOwnProperty("logo")) this.header.logo = data.logo
          if (data.hasOwnProperty("auth")) {
            for(let id of Object.keys(data.auth)) {
              data.auth[id].id = id
              this.header.auths.push(data.auth[id])
              this.nav.auths.push(data.auth[id])
            }
          }
          if (data.hasOwnProperty("footer")) {
            if (data.footer.hasOwnProperty("links")) {
              for(let id of Object.keys(data.footer.links)) {
                data.footer.links[id].id = id
                this.footer.links.push(data.footer.links[id])
              }
            }
          }
          if (data.hasOwnProperty("user")) {
            if ( data.user.loggedin ) {
              this.$store.commit('login', data.user.name || "" )
            } else {
              this.$store.commit('logout')
            }
          }
          if (data.hasOwnProperty("nav")) {
            if (data.nav.hasOwnProperty("active")) this.nav.active = data.nav.active
            if (data.nav.hasOwnProperty("menu")) this.nav.menu = data.nav.menu
            if (data.nav.hasOwnProperty("home")) this.nav.home = data.nav.home
          }

        })
      })
    })
  }
}
</script>
