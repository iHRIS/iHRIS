import Vue from "vue";
import vuetify from "./plugins/vuetify";
import AsyncComputed from "vue-async-computed";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DatetimePicker from 'vuetify2-datetime-picker';
import 'vuetify2-datetime-picker/src/stylus/main.styl';

Vue.use(DatetimePicker);
Vue.use(AsyncComputed);

Vue.config.productionTip = false;
Vue.filter("sentenceCase", value => {
  if (!value) {
    return null;
  }

  if (typeof value != "string") {
    return value;
  }

  let data = value.replace(/([A-Z])/g, " $1");
  data = data.charAt(0).toUpperCase() + data.slice(1);
  return data;
});

Vue.filter("separateByCommas", value => {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.join(", ");
});

export const serverBus = new Vue();

new Vue({
  router: router,
  vuetify: vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
