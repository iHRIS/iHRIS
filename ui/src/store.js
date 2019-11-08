import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authentication: {
      username: VueCookies.get("username") || null,
      userId: VueCookies.get("userId") || null
    },
    indeterminateProgress: false,
    indeterminateProgressTitle: ""
  },
  mutations: {},
  actions: {}
});
