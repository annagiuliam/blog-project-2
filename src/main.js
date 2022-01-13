import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import router from './router'

import GetTextPlugin from 'vue-gettext'
import translations from './path/to/translations'

Vue.use(GetTextPlugin, {
  availableLanguages: {

    en_US: 'American English',
    de_DE: 'German'
  },
  defaultLanguage: 'de_DE',
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace('_', '-')
      }
    }
  },
  translations: translations,
  silent: True
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
