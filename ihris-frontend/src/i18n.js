import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


function loadLocaleMessages () {
  let locales
  try {
    locales = require.context('../site/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  } catch (error) {
    console.log(error);
    locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  }
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

// function test() {
//   fetch( "/dictionary/getLocales" ).then( response => {
//     response.json().then( bundle => {
//       console.log(bundle);
//     })
// })
// }
export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
