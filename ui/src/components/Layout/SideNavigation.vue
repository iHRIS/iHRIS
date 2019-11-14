<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    class="primary darken-1 text-uppercase white--text font-weight-bold"
  >
    <v-list nav v-for="item in menu" :key="item.title">
      <v-list-group v-if="item.submenu.length" no-action class="white--text">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
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
          <v-list-item-title class="white--text">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { serverBus } from "../../main";

export default {
  created() {
    serverBus.$on("toggleDrawer", drawer => {
      this.drawer = drawer;
    });
  },
  data: function() {
    return {
      drawer: true,
      menu: [
        {
          action: { name: "home" },
          icon: "dashboard",
          submenu: [],
          title: "Dashboard"
        },
        {
          action: { name: "people" },
          icon: "people",
          submenu: [
            {
              action: { path: "/people/view/8755" },
              title: "Sample Practitioner"
            },
            {
              action: { name: "search-people" },
              title: "Search people"
            },
            {
              action: { name: "add-people" },
              title: "Add people"
            }
          ],
          title: "People"
        }
      ]
    };
  }
};
</script>
