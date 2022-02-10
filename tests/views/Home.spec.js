import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Home from '@views/PostPage.vue'
import { testPost } from '../helpers/testHelpers'

Vue.use(Vuetify)

Vue.use(Vuex)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(Home, {
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate,
      $language: {
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
  it('renders')
})
