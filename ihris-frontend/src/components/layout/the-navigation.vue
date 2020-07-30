<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    class="primary darken-1 white--text font-weight-bold"
    style="z-index: 3;"
  >
    <v-list
      nav
      dark
      dense
    >
      <v-list-group
        prepend-icon="mdi-account-multiple"
        color="white--text"
        :class="personClass"
        :value="person"
        @change="setPerson()"
      >
        <template v-slot:activator>
          <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">People</v-list-item-title>
        </template>
        <v-list-item
          to="/resource/search/practitioner"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Search People</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item
          to="/questionnaire/ihris-practitioner/practitioner"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Add Person</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item
          to="/resource/add/practitioner"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Add Person (old)</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group
        prepend-icon="mdi-account-multiple"
        color="white--text"
        :class="positionClass"
        :value="position"
        @change="setPosition()"
      >
        <template v-slot:activator>
          <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">Position</v-list-item-title>
        </template>
        <v-list-item
          to="/resource/search/practitionerrole"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Search Positions</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item
          to="/resource/add/practitionerrole"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Add Position</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group
        prepend-icon="mdi-cellphone-basic"
        color="white--text"
        :class="mheroClass"
        :value="mhero"
        @change="setMhero()"
      >
        <template v-slot:activator>
          <v-list-item-title class="subtitle-1 font-weight-bold">mHero</v-list-item-title>
        </template>
        <v-list-item
          to="/page/mhero"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>Send Messages</v-list-item-title>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item
          to="/resource/add/practitionerrole"
          active-class="primary darken-2"
          class="text-right"
          dense
        >
          <v-list-item-title>mHero Dashboard</v-list-item-title>
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
      person: false,
      positionClass: "",
      position: false,
      mheroClass: "",
      mhero: false
    };
  },
  methods: {
    setPerson: function() {
      this.person = !this.person;
      if (this.person) {
        this.personClass = "primary darken-2";
      } else {
        this.personClass = "";
      }
    },
    setPosition: function() {
      this.position = !this.position;
      if (this.position) {
        this.positionClass = "primary darken-2";
      } else {
        this.positionClass = "";
      }
    },
    setMhero: function() {
      this.mhero = !this.mhero;
      if (this.mhero) {
        this.mheroClass = "primary darken-2";
      } else {
        this.mheroClass = "";
      }
    }
  }
};
</script>
