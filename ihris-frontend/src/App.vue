<template>
  <v-app>
    <AppHeader title="Manage" site="Demo" />

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/layout/AppHeader"
import HelloWorld from "./components/HelloWorld"

export default {
  name: "App",

  components: {
    AppHeader,
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>
