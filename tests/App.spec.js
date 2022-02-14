import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import App from '@/App.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(App, {
    stubs: ['router-view'],
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate,
      $store: {
        state: {
          currentPost: null,
          posts: [],
          inputDialog: false
        }
      }
    }
  })
}

describe('App', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    utils.debugDom(wrapper)
    expect(wrapper.isVisible()).toEqual(true)
  })
})
