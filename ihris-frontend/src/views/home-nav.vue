<template>
  <div class="home">
    <v-container v-if="$store.state.user.loggedin">

      <v-row>
      <template v-for="(item,idx) in menu">

        <v-col cols="4" :key="item.id">
          <v-card
            shaped
            class="md ma-2"
          >
            <v-card-title
              :prepend-icon="item.icon"
              dark
              class="primary white--text subtitle font-weight-bold text-uppercase"
              :class="colors[idx % colors.length]"
            >
              <v-icon dark>{{item.icon}}</v-icon>
              {{item.text}} 
            </v-card-title>

            <v-card-text>
              <v-list v-if="item.menu">
                <v-list-item
                  v-for="sub in item.menu"
                  :key="sub.id"
                  :to="sub.url"
                >
                  <v-list-item-title class="text-h2">{{sub.text}}</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item 
                  :to="item.url" 
                  :key="item.id"
                >
                  <v-list-item-title class="text-h2">{{item.text}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>

          </v-card>
        </v-col>

      </template>
      </v-row>

    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeNav",
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
      menu: [],
      colors: [
        "accent",
        "success",
        "warning",
        "info",
        "error",
        "secondary",
        "primary darken-1",
        "primary darken-2",
        "secondary darken-1",
        ]
    }
  },
  methods: {
    updateMenu: function() {
      if ( this.$store.state.user.loggedin && this.nav.home ) {
        this.$router.push(this.nav.home)
        return
      }
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
            entry.menu.sort( (a,b) => a.order === b.order ? 0 : ( a.order < b.order ? -1 : 1 ) )
          }
        } else if ( this.nav.menu[menu_id].url ) {
          entry.url = this.nav.menu[menu_id].url
        }
        this.menu.push( entry )
      }
      this.menu.sort( (a,b) => a.order === b.order ? 0 : ( a.order < b.order ? -1 : 1 ) )

    }
  }
};
</script>
