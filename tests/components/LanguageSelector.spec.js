import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import LanguageSelector from '@/components/LanguageSelector.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(LanguageSelector, {
    stubs: ['Flag'],
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate,
      $language: {
        available: {
          'en-US': { name: 'American English', code: 'US' },
          'de-DE': { name: 'Deutsch', code: 'DE' }
        },
        current: 'de-DE'
      }
    }
  })
}

describe('language selector', () => {
  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toBe(true)
  })
})
