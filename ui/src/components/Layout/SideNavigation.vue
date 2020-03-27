<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    :mini-variant.sync="mini"
    permanent
    class="primary darken-1 white--text font-weight-bold"
  >
    <v-btn v-if="smallScreenSize" icon @click.stop="mini = !mini"
      ><v-icon class="white--text">{{ chevronIcon }}</v-icon>
    </v-btn>
    <v-list nav v-for="item in menu" :key="item.title">
      <v-list-group v-if="item.submenu.length" no-action class="white--text">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              class="white--text"
              v-bind:class="{ 'text-uppercase': !item.doNotCapitalize }"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subitem in item.submenu"
          :key="subitem.title"
          :to="subitem.action"
          class="text-capitalize"
        >
          <v-list-item-content>
            <v-list-item-title
              class="white--text"
              v-text="subitem.title"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item v-else link :to="item.action" active-class="darken-2">
        <v-list-item-icon>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="white--text"
            v-bind:class="{ 'text-uppercase': !item.doNotCapitalize }"
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  computed: {
    chevronIcon() {
      if (this.hasSmallScreenSize()) {
        return "mdi-chevron-left";
      } else {
        return "mdi-chevron-right";
      }
    },
    mini() {
      return this.hasSmallScreenSize();
    },
    smallScreenSize() {
      return this.hasSmallScreenSize();
    }
  },
  created() {
    this.screenSize = this.$vuetify.breakpoint.name;
  },
  data: function() {
    const config = require("@/config/config.json");
    let submenu = [];

    if (config.samplePractitioner) {
      submenu.push({
        action: { path: "/people/view/" + config.samplePractitioner },
        title: "Sample Practitioner"
      });
    }

    submenu.push({
      action: { name: "search-people" },
      title: "Search people"
    });

    submenu.push({
      action: { name: "add-people" },
      title: "Add people"
    });

    let menu = [
      {
        action: { name: "home" },
        icon: "dashboard",
        submenu: [],
        title: "Dashboard"
      },
      {
        action: { name: "people" },
        icon: "people",
        submenu: submenu,
        title: "People"
      }
    ];

    if (this.isMHeroEnabled()) {
      menu.push({
        action: { name: "mhero" },
        icon: "mdi-cellphone-basic",
        submenu: [
          {
            action: { name: "mhero" },
            title: "Send Message"
          },
          {
            action: { name: "mhero-reports" },
            title: "Reports"
          }
        ],
        title: "mHero",
        doNotCapitalize: true
      });
    }

    return {
      drawer: true,
      screenSize: "",
      menu: menu
    };
  },
  methods: {
    hasSmallScreenSize() {
      return this.screenSize === "sm" || this.screenSize === "xs";
    }
  },
  mixins: [ConfigSettings]
};
</script>
