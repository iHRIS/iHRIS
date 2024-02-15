<template>
  <div class="home">
    <div class="grid">
      <v-layout wrap  class="item" v-for="(item,idx) in menu" :key="idx">
        <v-flex>
        <v-card
            class="md ma-2 content"
            shaped
        >
          <v-card-title
              :class="colors[idx % colors.length]"
              :prepend-icon="item.icon"
              class="primary white--text subtitle font-weight-bold text-uppercase"
              dark
          >
            <v-icon dark>{{ item.icon }}</v-icon>
            {{ $t(`App.menu.${item.text}`) }}
          </v-card-title>
          <v-card-text>
            <v-list v-if="item.menu">
              <v-list-item
                  v-for="sub in item.menu"
                  :key="sub.id"
                  :to="sub.url"
              >
                <v-list-item-title class="font-weight-bold">{{ $t(`App.menu.${sub.text}`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item
                  :key="item.id"
                  :to="item.url"
              >
                <v-list-item-title class="font-weight-bold">{{ $t(`App.menu.${item.text}`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
          </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "HomeNav",
  props: ["nav"],
  mounted: function () {
    this.$nextTick(() => {
      this.resizeAllGridItems();
      window.addEventListener('resize', this.resizeAllGridItems);
      this.items = this.$el.getElementsByClassName('item');
    });
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
  data: function () {
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
    resizeGridItem(item) {
      const grid = this.$el.getElementsByClassName('grid')[0];
      const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    },
    resizeAllGridItems() {
      this.items = this.$el.getElementsByClassName('item');
      for (let x = 0; x < this.items.length; x++) {
        this.resizeGridItem(this.items[x]);
      }
    },
    updateMenu: function () {
      if (this.$store.state.user.loggedin && this.nav.home) {
        if (this.nav.home.external === "true") {
          window.location = this.nav.home.url
        } else {
          this.$router.push(this.nav.home.url)
        }
        return
      }
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
            let sub = {
              id: sub_id,
              text: this.nav.menu[menu_id].menu[sub_id].text,
              url: this.nav.menu[menu_id].menu[sub_id].url,
              order: this.nav.menu[menu_id].menu[sub_id].order
            }
            entry.menu.push(sub)
            entry.menu.sort((a, b) => a.text === b.text ? 0 : (a.text < b.text ? -1 : 1))
            //entry.menu.sort( (a,b) => Number(a.order) === Number(b.order) ? 0 : ( Number(a.order) < Number(b.order) ? -1 : 1 ) )
          }
        } else if (this.nav.menu[menu_id].url) {
          entry.url = this.nav.menu[menu_id].url
        }
        this.menu.push(entry)
      }

      this.menu.sort((a, b) => Number(a.order) === Number(b.order) ? 0 : (Number(a.order) < Number(b.order) ? -1 : 1))
    }
  }
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 20px;
}
@media (min-width: 599px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>