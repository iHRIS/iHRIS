<template>
  <v-container>
    Logout
  </v-container>
</template>

<script>
import { store } from "@/store.js";
import VueCookies from "vue-cookies";

export default {
  created() {
    VueCookies.remove("username");
    VueCookies.remove("userId");
    VueCookies.remove("roles");

    store.state.authentication.username = null;
    store.state.authentication.userId = null;
    store.state.roles = null;
    store.state.allowToAccessTheNextPage=false;

    this.$router.push({ name: "home" });
  }
};
</script>
