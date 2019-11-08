<template>
  <v-container>
    Logout
  </v-container>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  created() {
    VueCookies.remove("username");
    VueCookies.remove("userId");

    this.$store.state.authentication.username = null;
    this.$store.state.authentication.userId = null;

    this.$router.push({name: "home"});
  }
};
</script>
