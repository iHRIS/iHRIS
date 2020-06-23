<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    class="primary darken-1 white--text font-weight-bold"
    style="z-index: 3;"
  >
    <v-list nav dark dense>
      <v-list-group
        prepend-icon="mdi-account-multiple"
        color="white--text"
        :class="personClass"
        :value="person"
        @change="setClass()"
      >
        <template v-slot:activator>
          <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">People</v-list-item-title>
        </template>
        <v-list-item to="/resource/search/practitioner" active-class="primary darken-2" class="text-right" dense>
          <v-list-item-title>Search People</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item to="/questionnaire/ihris-practitioner" active-class="primary darken-2" class="text-right" dense>
          <v-list-item-title>Add Person</v-list-item-title>
            <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list-group>


      <v-list-item to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-poll-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">Dashboard</v-list-item-title>
      </v-list-item>


    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "the-navigation",
  props: ["nav"],
  data: function() {
    return {
      personClass: "",
      person: false
    }
  },
  methods: {
    setClass: function() {
      this.person = !this.person
      if ( this.person ) {
        this.personClass = "primary darken-2"
      } else {
        this.personClass = ""
      }
    }
  }
}
</script>
