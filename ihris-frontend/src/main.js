import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueApexCharts from 'vue-apexcharts'
import HighchartsVue from "highcharts-vue";


const fetchDefaults = require("fetch-defaults")
import * as Keycloak from 'keycloak-js';
import VueCookies from 'vue-cookies'
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

Vue.component('apexchart', VueApexCharts)
Vue.use(HighchartsVue);
Vue.use(require('vue-moment'));
export const eventBus = new Vue()
Vue.use(IdleVue, { eventEmitter: eventBus, store, idleTime: 900000, startAtIdle: false })

fetch("/config/app").then((response) => {
  response.json().then(data => {
    store.state.idp = data.idp
    if (store.state.idp === 'keycloak') {
      let initOptions = {
        realm: data.keycloak.realm,
        clientId: data.keycloak.UIClientId,
        url: data.keycloak.baseURL,
        onLoad: 'login-required'
      }

      let keycloak = Keycloak(initOptions);
      const Plugin = {
        install(Vue) {
          Vue.$keycloak = keycloak
        }
      }

      Plugin.install = Vue => {
        Vue.$keycloak = keycloak
        Object.defineProperties(Vue.prototype, {
          $keycloak: {
            get() {
              return keycloak
            }
          }
        })
      }
      Vue.use(Plugin)
      keycloak.init({ onLoad: initOptions.onLoad }).then(auth => {
        if (!auth) {
          window.location.reload();
        } else {
          window.fetch = fetchDefaults(fetch, {
            headers: { Authorization: `Bearer ${keycloak.token}` }
          })
          keycloak.loadUserInfo().then((userinfo) => {
            let user = {
              resourceType: 'Person',
              id: userinfo.sub,
              meta: {
                profile: ['http://ihris.org/fhir/StructureDefinition/ihris-person-user']
              },
              name: [{
                use: 'official',
                text: userinfo.name
              }],
              active: true
            }
            if (userinfo.email) {
              user.telecom = [{
                system: 'email',
                value: userinfo.email
              }]
            }
            fetch('/auth', {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify(user)
            }).then((response) => {
              response.json().then(data => {
                VueCookies.set('userObj', JSON.stringify(data), 'infinity')
                new Vue({
                  router,
                  store,
                  vuetify,
                  render: h => h(App)
                }).$mount('#app')
              })
            }).catch((err) => {
              console.error(err)
            })
          })
          setInterval(() => {
            keycloak.updateToken(70)
          }, 60000)
        }
      }).catch(() => {
        alert("Keycloak access failed")
      });
    } else {
      Vue.prototype.$keycloak = null
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app")
    }
  })
})
