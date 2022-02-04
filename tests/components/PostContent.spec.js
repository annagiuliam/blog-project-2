import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import PostContent from '@/components/PostContent.vue'
import { testPost } from '../helpers/testHelpers'

Vue.use(Vuetify)
Vue.use(Vuex)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(PostContent, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate,
      $language: {
        current: 'de-DE'
      },
      $store: {
        dispatch: jest.fn()
      },
      $route: {
        name: 'home'
      }
    },
    propsData: {
      post: testPost
    }
  })
}

describe('post content', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('displays fallback text', async () => {
    const wrapper = render()
    await wrapper.setProps({ post: null })

    const fallbackText = wrapper.find('[data-cm-qa="fallback-text"]')
    expect(fallbackText.exists()).toBe(true)
  })

  it('displays post content correctly if post provided', () => {
    const wrapper = render()

    const title = wrapper.find('.v-list-item__title')
    expect(title.text()).toEqual(testPost.title)
  })

  it('displays correct formatted date', () => {
    const wrapper = render()
    const testDate = new Date().toLocaleDateString(wrapper.vm.$language.current, wrapper.vm.$data.dateOptions)
    const postDate = wrapper.find('[data-cm-qa="formatted-date"]')
    expect(postDate.text()).toEqual(testDate)
  })

  it.only('dispatches delete post action correctly', async () => {
    const wrapper = render()
    // const spyDelete = jest.spyOn(PostContent.methods, 'deletePost')
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const deleteBtn = wrapper.find('[data-cm-qa="delete-btn"]')
    // was ist besser knopf mit data-cm-qa oder mit icon Klasse??
    // const deleteBtn = wrapper.find('.mdi-delete-outline')
    await deleteBtn.trigger('click')
    utils.debugDom(wrapper)
    expect(mockDispatch).toHaveBeenCalledWith('deletePost', testPost)
  })
})
