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
            :value="item.active"
            v-model="item.active"
            :class="(item.active ? 'primary darken-2' : '')"
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
        let entry = {
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
            entry.menu.sort( (a,b) => { a.order === b.order ? 0 : ( a.order < b.order ? -1 : 1 ) } )
          }
        } else if ( this.nav.menu[menu_id].url ) {
          entry.url = this.nav.menu[menu_id].url
        }
        this.menu.push( entry )
      }
      this.menu.sort( (a,b) => { a.order === b.order ? 0 : ( a.order < b.order ? -1 : 1 ) } )
    }
  }
}
</script>