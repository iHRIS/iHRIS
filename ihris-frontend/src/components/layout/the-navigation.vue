<template>
  <v-navigation-drawer
      v-if="$store.state.user.loggedin"
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      class="primary darken-1 white--text font-weight-bold"
      clipped
      permanent
      style="z-index: 3;"
  >
    <v-list-item class="px-2 py-2">
      <v-list-item-avatar>
        <v-icon class="white--text" size="48">mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="white--text">{{ $store.state.user.name }}</v-list-item-title>
        <v-list-item-subtitle class="white--text">{{ $store.state.user.roleName }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
          icon
          @click.stop="mini = !mini"
      >
        <v-icon class="white--text">mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider class="grey"></v-divider>
    <v-list
        v-if="$store.state.user.loggedin"
        dark
        dense nav>
      <template v-for="item in menu">
        <template  v-if="item.menu">
          <v-list-group
              :key="item.id"
              v-model="item.active"
              :class="(item.active&&!mini ? 'primary pa-3' : item.active&&mini ? 'primary':'')"
              :prepend-icon="item.icon"
              :value="item.active"
              color="white--text"
              no-action
              style="border-radius: 20px;"
          >
            <template v-slot:activator>
              <v-list-item-title  class="subtitle-1  font-weight-bold text-uppercase">{{ $t(`App.menu.${item.text}`) }}
              </v-list-item-title>
            </template>
            <v-list-item
                v-for="sub in item.menu"
                :key="sub.id"
                :to="sub.url"
                active-class="primary darken-2"
                class="text-right"
                dense
            >
              <v-list-item-title>{{ $t(`App.menu.${sub.text}`) }}</v-list-item-title>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :key="item.id" :href="item | getExternalURL" :to="item | getInternalURL">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">{{ $t(`App.menu.${item.text}`) }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <v-list
        v-else
        class="primary lighten-1"
        dark
        dense nav>
      <v-list-item
          v-for="auth in nav.auths"
          :key="auth.id"
      >
        <v-list-item-title>
          <auth-button :big="true" :data="auth" v-on:loggedin="$emit('loggedin', $event)"></auth-button>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AuthButton from "./auth-button"

export default {
  name: "the-navigation",
  props: ["nav"],
  components: {
    AuthButton
  },
  mounted: function () {
    this.updateMenu()
  },
  watch: {
    nav: {
      handler() {
        this.updateMenu()
      },
      deep: true
    },
  },
  filters: {
    getInternalURL(item) {
      if (item.external === "true") {
        return ""
      }
      return item.url
    },
    getExternalURL(item) {
      if (item.external === "true") {
        return item.url
      }
      return ""
    }
  },
  data: function () {
    return {
      menu: [],
      mini: false,
      drawer: true,
    }
  },
  methods: {
    updateMenu: function () {
      this.menu = []
      for (let menu_id of Object.keys(this.nav.menu)) {
        let entry = {}
        entry = {
          id: menu_id,
          text: this.nav.menu[menu_id].text,
          icon: this.nav.menu[menu_id].icon,
          order: this.nav.menu[menu_id].order
        }
        if (this.nav.active === menu_id) {
          entry.active = true
        } else {
          entry.active = false
        }
          if (this.nav.menu[menu_id].menu) {
            entry.menu = []
            for (let sub_id of Object.keys(this.nav.menu[menu_id].menu)) {
              if(this.nav.menu[menu_id].menu[sub_id]?.menu){
                entry.url = `/show-in-grid/${menu_id}`
                delete entry.menu
                break
              }
              let sub = {
                id: sub_id,
                text: this.nav.menu[menu_id].menu[sub_id].text,
                url: this.nav.menu[menu_id].menu[sub_id].url,
                order: this.nav.menu[menu_id].menu[sub_id].order,
                external: this.nav.menu[menu_id].external,
                menu: {}
              }
              entry.menu.push(sub)
              entry.menu.sort((a, b) => a.text === b.text ? 0 : (a.text < b.text ? -1 : 1))
            }
          } else if (this.nav.menu[menu_id].url) {
            entry.url = this.nav.menu[menu_id].url
            entry.external = this.nav.menu[menu_id].external
          }

        this.menu.push(entry)
      }
      this.menu.sort((a, b) => Number(a.order) === Number(b.order) ? 0 : (Number(a.order) < Number(b.order) ? -1 : 1))
    }
  },
}
</script>
<style scoped>
.v-application .primary {
  background-color: #569fd36e !important;
  border-color: var(--v-primary-base) !important;
}
.v-application .primary.darken-2 {
  background-color: #00000000 !important;
  border-color: #000000 !important;
}
</style>
