import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fhir: {}
  },
  mutations: {
    setCurrentResource ( state, payload ) {
      state.fhir = payload
    },
    resetCurrentResource( state ) {
      state.fhir = {}
    }
  },
  actions: {},
  modules: {}
});
