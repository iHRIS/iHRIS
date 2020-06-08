<template>
  <v-app-bar color="white" app clipped-left>
    <router-link to="/"><v-img :src="'/images/' + header.logo" contain max-height="36" max-width="106" /></router-link>

    <v-toolbar-title class="headline ml-2" bottom="true">
      <span v-if="header.title" class="primary--text">{{ header.title }}</span>
      <span class="secondary--text" v-if="header.site"> | {{ header.site }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-progress-circular
      indeterminate
      v-if="!header.title"
      color="primary"
    ></v-progress-circular>
    <v-btn icon to="/" title="Home">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon title="Help">
      <v-icon>mdi-help</v-icon>
    </v-btn>
    <v-menu
      left
      bottom
      v-if="!header.user.loggedin"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" title="Login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="auth in header.auths" 
          :key="auth.id"
        >
          <v-list-item-title>
            <AuthButton :data="auth" v-on:loggedin="header.user.loggedin=true; header.user.name=$event"></AuthButton>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-if="header.user.loggedin">
      Welcome, {{ header.user.name }}
      <v-btn icon @click="logout" title="Logout" :loading="loading" :disabled="loading">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>
import AuthButton from "./AuthButton"

export default {
  props: ["header"],
  data: function() {
    return {
      loading: false
    }
  },
  components: {
    AuthButton
  },
  methods: {
    logout() {
      this.loading = true
      fetch("/auth/logout").then(response => {
        this.loading = false
        if ( response.status == 200 ) {
          this.header.user.loggedin = false 
          this.header.user.name = ""
        }
      })
    }
  }
}
</script>
