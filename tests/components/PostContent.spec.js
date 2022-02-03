import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import PostContent from '@/components/PostContent.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(PostContent, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate
    }
  })
}
