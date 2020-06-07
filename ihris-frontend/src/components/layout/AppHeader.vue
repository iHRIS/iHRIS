<template>
  <v-app-bar color="white" app clipped-left>
    <v-img :src="'/images/' + logo" contain max-height="36" max-width="106" />

    <v-toolbar-title class="headline ml-2" bottom="true">
      <span v-if="title" class="primary--text">{{ title }}</span>
      <span class="secondary--text" v-if="site"> | {{ site }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-progress-circular
      indeterminate
      v-if="!title"
      color="primary"
    ></v-progress-circular>
    <v-menu
      left
      bottom
      v-if="!user.loggedin"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" title="Login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="auth in auths" 
          :key="auth.id"
        >
          <v-list-item-title>
            <AuthButton :data="auth" v-on:loggedin="user.loggedin=true; user.name=$event"></AuthButton>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-if="user.loggedin">
      Welcome, {{ user.name }}
      <v-btn icon @click="logout" title="Logout" :loading="loading" :disabled="loading">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>
import AuthButton from "./AuthButton"

export default {
  data: function() {
    return {
      title: false,
      site: null,
      logo: "iHRIS5Logo.png",
      auths: [],
      user: { loggedin: false, name: "" },
      loading: false
    }
  },
  components: {
    AuthButton
  },
  created: function() {
    // make sure we're user has been created in session (logged in or not)
    fetch("/auth").then(()=> {

      fetch("/config/site").then(response => {
        response.json().then(data => {
          if (data.hasOwnProperty("title")) this.title = data.title
          if (data.hasOwnProperty("site")) this.site = data.site
          if (data.hasOwnProperty("logo")) this.logo = data.logo
          if (data.hasOwnProperty("auth")) {
            for(let id of Object.keys(data.auth)) {
              data.auth[id].id = id
              this.auths.push(data.auth[id])
            }
          }
          if (data.hasOwnProperty("user")) {
            if (data.user.hasOwnProperty("loggedin")) this.user.loggedin = data.user.loggedin
            if (data.user.hasOwnProperty("name")) this.user.name = data.user.name
          }
        })
      })
    })
  },
  methods: {
    logout() {
      this.loading = true
      fetch("/auth/logout").then(response => {
        this.loading = false
        if ( response.status == 200 ) {
          this.user.loggedin = false 
          this.user.name = ""
        }
      })
    }
  }
}
</script>
