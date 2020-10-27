<template>
  <v-app-bar color="white" app clipped-left clipped-right>
    <router-link to="/"><v-img :src="'/images/' + header.logo" contain max-height="36" max-width="106" /></router-link>

    <v-toolbar-title class="headline ml-2" bottom="true">
      <span v-if="header.title" class="primary--text">{{ header.title }}</span>
      <span class="secondary--text" v-if="header.site"> | {{ header.site }}</span>
    </v-toolbar-title>

    <v-spacer v-if=$store.state.security_off></v-spacer>
    <div class="error font-weight-bold white--text" dark v-if="$store.state.security_off">
      Security has been disabled for remote configuration and modules!  <br />
      This should only be done during development.
    </div>
    <v-spacer></v-spacer>
    <div>Welcome <span v-if="$store.state.user.loggedin">, {{ $store.state.user.name }}</span></div>
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
      v-if="!$store.state.user.loggedin"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="success" class="mx-2" small fab dark v-on="on" title="Login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="auth in header.auths" 
          :key="auth.id"
        >
          <v-list-item-title>
            <auth-button :data="auth" v-on:loggedin="$store.commit('login', $event)"></auth-button>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-if="$store.state.user.loggedin">
      <v-btn color="warning" small fab dark @click="logout" title="Logout" :loading="loading" :disabled="loading">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>

</template>

<script>
import AuthButton from "./auth-button"

export default {
  name: "the-header",
  props: ["header"],
  data: function() {
    return {
      loading: false
    }
  },
  components: {
    AuthButton
  },
  onIdle() {
      if ( this.$store.state.user.loggedin ) this.logout(null, true)
  },
  methods: {
    logout(e, force) {
      this.loading = true
      fetch("/auth/logout").then(() => {
        this.loading = false
        this.$store.commit('logout')
        if ( force ) {
          this.$store.commit('setMessage', { type: 'warning', text: 'You have been logged out due to inactivity.', timeout: 3600000 } )
        } else {
          this.$store.commit('setMessage', { type: 'success', text: 'You have logged out.' } )
        }
        this.$router.push( {path: "/" } )
      })
    }
  }
}
</script>
