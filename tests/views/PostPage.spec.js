import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import PostPage from '@/views/PostPage.vue'

Vue.use(Vuetify)

Vue.use(Vuex)

const testPost = {
  // author: "",
  firstName: 'anna',
  middleName: 'giulia',
  lastName: 'musso',
  email: 'agm@blabla',
  category: 'environment',
  title: 'hello',
  content: 'blabla',
  // these are not connected to the form with v-model
  creationDate: new Date(),
  id: 'abcde'
}

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
      postId: 'abcde'
    }

  })
}

describe('PostPage', () => {
  it('renders', () => {
    const wrapper = render()
    utils.debugDom(wrapper)

    console.log(wrapper.vm.$data)
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('changes prop correctly', async () => {
    const wrapper = render()
    wrapper.setProps({ postId: 'xoxo' })
    await Vue.nextTick()
    utils.debugDom(wrapper)

    expect(wrapper.props().postId).toEqual('xoxo')
  })
})
