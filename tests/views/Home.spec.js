import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Home from '@/views/Home.vue'
import { testPost } from '../helpers/testHelpers'

Vue.use(Vuetify)

Vue.use(Vuex)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(Home, {
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
      },
      $store: new Vuex.Store({
        strict: true,
        state () {
          return {
            posts: []
          }
        }
      })
    }
  })
}

describe('Home', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })
  it('renders', () => {
    const wrapper = render()

    expect(wrapper.isVisible()).toEqual(true)
  })

  it.only('shows fallback text if there are no posts', () => {
    const wrapper = render()
    const fallback = wrapper.find('h1')

    expect(fallback.text()).toBe('**There are no blog posts**')
  })
})
