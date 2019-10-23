import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: {
      base: "#569fd3",
      darken1: "#0D3552",
      lighten1: "#DDECF6"
    },
    secondary: "#5f6062",
    accent: "#78496a",
    error: "#b32317",
    info: "#005595",
    success: "#8a8d35",
    warning: "#d06f1a"
  }
});

const opts = {
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: {
          base: "#569fd3",
          darken1: "#0D3552",
          lighten1: "#DDECF6"
        },
        secondary: "#5f6062",
        accent: "#78496a",
        error: "#b32317",
        info: "#005595",
        success: "#8a8d35",
        warning: "#d06f1a"
      }
    }
  }
};

export default new Vuetify(opts);
