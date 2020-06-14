import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import 'whatwg-fetch'
import fhirpath from "fhirpath"

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$fhirpath', { value: fhirpath })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
