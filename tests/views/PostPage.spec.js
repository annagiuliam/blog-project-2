import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import PostPage from '@/views/PostPage.vue'
import { testPost } from '../../tests/helpers/testHelpers'

Vue.use(Vuetify)

Vue.use(Vuex)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(PostPage, {
    vuetify: new Vuetify(),
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
            posts: [testPost]
          }
        }
      })

    },
    propsData: {
      postId: null
    }

  })
}

describe('PostPage', () => {
  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('shows message no post found', async () => {
    const wrapper = render()
    const fallBackText = wrapper.find('[data-cm-qa="fallback-text"]')

    expect(fallBackText.text()).toBe('**No post found**')
  })

  it('finds correct post in store', async () => {
    const wrapper = render()
    await wrapper.setProps({ postId: 'abcde' })
    const title = wrapper.find('.v-list-item__title')
    expect(title.text()).toEqual(testPost.title)
  })
})
