<template>
  <v-app id="top">
    <the-header :header="header" />
    <the-navigation :nav="nav" />


    <v-content>
      <router-view :key="$route.path"/>
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
      user: { loggedin: false, name: "" },
    },
    footer: {
      links: []
    },
    nav: {
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
          if (data.hasOwnProperty("title")) this.header.title = data.title
          if (data.hasOwnProperty("site")) this.header.site = data.site
          if (data.hasOwnProperty("logo")) this.header.logo = data.logo
          if (data.hasOwnProperty("auth")) {
            for(let id of Object.keys(data.auth)) {
              data.auth[id].id = id
              this.header.auths.push(data.auth[id])
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
            if (data.user.hasOwnProperty("loggedin")) this.header.user.loggedin = data.user.loggedin
            if (data.user.hasOwnProperty("name")) this.header.user.name = data.user.name
          }
        })
      })
    })
  }
}
</script>
