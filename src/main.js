import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import router from './router'

import GetTextPlugin from 'vue-gettext'
import translations from './../i18n/parsed.json'

import Flag from 'vue-flagpack'

Vue.use(Flag, {
  name: 'Flag'
})

Vue.use(GetTextPlugin, {
  availableLanguages: {
    'en-US': { name: 'American English', code: 'US' },
    'de-DE': { name: 'Deutsch', code: 'DE' }
  },
  defaultLanguage: 'de-DE',
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace('_', '-')
      }

    }
  },
  translations: translations,
  silent: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
