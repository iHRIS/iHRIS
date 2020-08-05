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
      dense>

      <template v-for="item in menu">
        
        <template v-if="item.menu">

          <v-list-group
            :key="item.id"
            :prepend-icon="item.icon"
            color="white--text"
            :value="item.toggle"
            v-model="item.toggle"
            :class="(item.toggle ? 'primary darken-2' : '')"
            no-action
            >
            <template v-slot:activator>
              <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">{{item.text}}</v-list-item-title>
            </template>
            <v-list-item 
              v-for="sub in item.menu"
              :key="sub.id"
              :to="sub.url"
              active-class="primary darken-2"
              class="text-right"
              dense
              >
                <v-list-item-title>{{sub.text}}</v-list-item-title>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item>

          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :to="item.url" :key="item.id">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">{{item.text}}</v-list-item-title>
          </v-list-item>

        </template>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "the-navigation",
  props: ["nav"],
  data: function() {
    return {
      menu: [ 
        {
          id: "person",
          icon: "mdi-account-multiple",
          text: "People",
          toggle: true,
          menu: [
            {
              id: "search",
              url: "/resource/search/practitioner",
              text: "Search People"
            },
            {
              id: "add",
              url: "/questionnaire/ihris-practitioner/practitioner",
              text: "Add Person"
            },
            {
              id: "add_old",
              url: "/resource/add/practitioner",
              text: "Add Person (old)"
            }
          ]
        },
        {
          id: "position",
          icon: "mdi-account-multiple",
          text: "Positions",
          toggle: false,
          menu: [
            {
              id: "search",
              url: "/resource/search/practitionerrole",
              text: "Search Positions"
            },
            {
              id: "add",
              url: "/resource/add/practitionerrole",
              text: "Add Position"
            }
          ]
        },
        {
          id: "mhero",
          icon: "mdi-cellphone-basic",
          text: "mHero",
          toggle: false,
          menu: [
            {
              id: "send",
              url: "/page/mhero",
              text: "Send Messages"
            },
            {
              id: "dashboard",
              url: null,
              text: "mHero Dashboard"
            }
          ]
        },
        {
          id: "vocab",
          icon: "mdi-database",
          text: "Database",
          toggle: false,
          menu: [
            {
              id: "job",
              url: "/resource/search/job",
              text: "Jobs"
            }
          ]
        },
        {
          id: "dashboard",
          icon: "mdi-poll-box",
          url: null,
          text: "Dashboard",
          toggle: false
        }
      ]
    };
  },
  methods: {
  }
};
</script>
