<template>
  <div class="home">
    <v-container v-if="$store.state.user.loggedin">
      <v-card elevation="1">
        <v-card-title class="primary darken-1 white--text font-weight-bold justify-center">
          <v-icon class="mr-2" color="white">{{ selectedIcon }}</v-icon>
          {{ selectedTitle }}
        </v-card-title>
        <div class="pa-2 grid" >
          <v-layout wrap class="item" v-for="(data,index) in nestedNav " :key="index">
          <v-flex  >
            <v-card   class="md ma-1 content" rounded>
              <v-card-title
                    prepend-icon="item.icon"
                    :style="{ backgroundColor:data[Object.keys(data)[0]].color?data[Object.keys(data)[0]].color:defaultColor }"
                    class="white--text subtitle justify-center font-weight-bold  pa-1"
                    dark
                >
                  <v-icon class="mr-2" dark>{{ data[Object.keys(data)[0]].icon }}</v-icon>
                {{data[Object.keys(data)[0]].text}}
                </v-card-title>
                <div v-html="renderNestedList(data)"></div>
            </v-card>
          </v-flex>
              </v-layout>
          <v-layout wrap class="item" v-for="(item) in menu" :key="item.id">
            <v-flex :key="item.id" >
              <v-card
                  :to="item.url"
                  class="md ma-1 content"
                  link
                  rounded
              >
                <v-card-title
                    :prepend-icon="item.icon"
                    :style="{ backgroundColor: defaultColor }"
                    class="white--text subtitle justify-center font-weight-bold  pa-1"
                    dark
                >
                  <v-icon class="mr-2" dark>{{ selectedIcon }}</v-icon>
                  {{ $t(`App.menu.${item.text}`) }}
                </v-card-title>
                <v-card-text v-if="item.description" align="justify"
                             class="text-subtitle-2 text--black font-weight-medium pa-2 ">
                  {{ item.description }}
                </v-card-text>
                <v-card-text v-else align="justify"
                             class="text-subtitle-2 text--black font-weight-medium pa-2 ">
                  {{ item.text }}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "ShowInGrid",
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
      selectedNav: [],
      selectedIcon: "",
      selectedTitle: "",
      defaultColor: "#0277BD",
      outputObj: {},
      nestedNav: [],
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
      if (this.$route?.params?.id) {
        let id = this.$route?.params?.id
        if (!this.nav.menu[id]) {
          this.$router.push("/")
        } else {

          this.selectedIcon = this.nav.menu[id].icon
          this.selectedTitle = this.nav.menu[id].text
          this.selectedNav = this.nav.menu[id].menu
          this.menu = []
          for (let menu_id of Object.keys(this.selectedNav)) {
            if (this.selectedNav[menu_id].menu) {
              let menu = {[menu_id]: this.selectedNav[menu_id]}
              this.nestedNav.push(this.cloneWithoutMenu(menu))
              this.recursive(menu, "")
            } else {
              let entry = {}
              entry = {
                id: menu_id,
                text: this.selectedNav[menu_id].text,
                order: this.selectedNav[menu_id].order,
                url: this.selectedNav[menu_id].url
              }
              if (this.selectedNav[menu_id]?.description) {
                entry.description = this.selectedNav[menu_id].description
              }
              if (this.nav.active === menu_id) {
                entry.active = true
              } else {
                entry.active = false
              }
              this.menu.push(entry)
            }
          }
          this.menu.sort((a, b) => Number(a.order) === Number(b.order) ? 0 : (Number(a.order) < Number(b.order) ? -1 : 1))
        }
      }
    },
    recursive: function (obj, name) {
      for (let key in obj) {
        if (typeof obj[key] == "object") {
          this.recursive(obj[key], name + "_" + key);
        } else {
          this.outputObj[name + "_" + key] = obj[key];
        }
      }
    },
    renderNestedList: function (data) {
      let exclude = ["text", "url", "order","icon","color"]
      let result = '<ul  style=" list-style: none; font-weight: 600 font-size: 0.875rem;line-height: 1.5 text-transform: capitalize">';
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (!exclude.includes(key)) {
            if (data[key]?.url) {
              result += `<i aria-hidden="true" class="v-icon notranslate mr-2 blue--text mdi mdi-link"></i><a style="text-decoration: none" @onclick="event.preventDefault();" href="${data[key].url}">${data[key]?.text}</a><br>`
              } else {
              result +='<li class=" text-subtitle-2 text--black font-weight-medium pa-0" style="list-style: none">' + `<i aria-hidden="true" class="v-icon teal--text notranslate mr-2 mdi ${data[key]?.icon}"></i>`  + data[key]?.text
              if (typeof data[key] === 'object') {
                result += this.renderNestedList(data[key]);
              }
              result += '</li>';
            }
          }
        }
      }
      result += '</ul>';
      return result;
    },
    cloneWithoutMenu: function (v) {
      if (typeof v !== "object") return v;
      let c = {};
      for (let k in v) {
        if (k !== 'menu') c[k] = this.cloneWithoutMenu(v[k]);
      }
      if (v['menu']) {
        for (let k in v['menu']) {
          if (k !== '0') c[k] = this.cloneWithoutMenu(v['menu'][k]);
        }
      }
      return c;
    }
  }
}
</script>
<style scoped>
ul {
  list-style:none ;
}
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