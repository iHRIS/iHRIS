<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    class="primary darken-1 white--text font-weight-bold"
    style="z-index: 3;"
    v-if="$store.state.user.loggedin"
  >
    <v-list
      nav
      dark
      dense v-if="$store.state.user.loggedin">

      <template v-for="item in menu">

        <template v-if="item.menu">

          <v-list-group
            :key="item.id"
            :prepend-icon="item.icon"
            color="white--text"
            :value="item.active"
            v-model="item.active"
            :class="(item.active ? 'primary pa-2' : '')"
            no-action
            style="border-radius: 20px;"
            >
            <template v-slot:activator>
              <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">{{$t(`App.menu.${item.text}`)}}</v-list-item-title>
            </template>
            <v-list-item
              v-for="sub in item.menu"
              :key="sub.id"
              :to="sub.url"
              active-class="primary darken-2"
              class="text-right"
              dense
              >
                <v-list-item-title>{{$t(`App.menu.${sub.text}`)}}</v-list-item-title>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item>

          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :to="item.url" :key="item.id">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-1 font-weight-bold text-uppercase">{{$t(`App.menu.${item.text}`)}}</v-list-item-title>
          </v-list-item>

        </template>
      </template>

    </v-list>
    <v-list
      nav
      dark
      class="primary lighten-1"
      dense v-else>
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
  mounted: function() {
    this.updateMenu()
  },
  watch: {
    nav: {
      handler() {
        this.updateMenu()
      },
      deep: true
    }
  },
  data: function() {
    return {
      menu: []
    }
  },
  methods: {
    updateMenu: function() {
      this.menu = []
      for( let menu_id of Object.keys(this.nav.menu) ) {
        let entry ={}
        entry = {
          id: menu_id,
          text: this.nav.menu[menu_id].text,
          icon: this.nav.menu[menu_id].icon,
          order: this.nav.menu[menu_id].order
        }
        if ( this.nav.active === menu_id ) {
          entry.active = true
        } else {
          entry.active = false
        }
        if ( this.nav.menu[menu_id].menu ) {
          entry.menu = []
          for( let sub_id of Object.keys( this.nav.menu[menu_id].menu ) ) {
            let sub = {
              id: sub_id,
              text: this.nav.menu[menu_id].menu[sub_id].text,
              url: this.nav.menu[menu_id].menu[sub_id].url,
              order: this.nav.menu[menu_id].menu[sub_id].order
            }
            entry.menu.push( sub )
            entry.menu.sort( (a,b) => a.text === b.text ? 0 : ( a.text < b.text ? -1 : 1 ) )
            //entry.menu.sort( (a,b) => Number(a.order) === Number(b.order) ? 0 : ( Number(a.order) < Number(b.order) ? -1 : 1 ) )
          }
        } else if ( this.nav.menu[menu_id].url ) {
          entry.url = this.nav.menu[menu_id].url
        }
        this.menu.push( entry )
      }

      this.menu.sort( (a,b) => Number(a.order) === Number(b.order) ? 0 : ( Number(a.order) < Number(b.order) ? -1 : 1 ) )
    }
  }
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
