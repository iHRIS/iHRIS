import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import IdleVue from "idle-vue"
import vuetify from "./plugins/vuetify"
import 'whatwg-fetch'
import fhirpath from "fhirpath"
import fhirutils from "./plugins/fhirutils"

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$fhirpath', {
  value: fhirpath
})
Object.defineProperty(Vue.prototype, '$fhirutils', {
  value: fhirutils
})

Vue.use(require('vue-moment'));
export const eventBus = new Vue()
Vue.use(IdleVue, { eventEmitter: eventBus, store, idleTime: 900000, startAtIdle: false })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
