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

    store.state.authentication.username = null;
    store.state.authentication.userId = null;

    this.$router.push({ name: "home" });
  }
};
</script>
