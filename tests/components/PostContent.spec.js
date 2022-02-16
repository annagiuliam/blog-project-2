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
        // dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      },
      $route: { name: 'home' }
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
    const testDate = new Date(2020, 0).toLocaleDateString(wrapper.vm.$language.current, wrapper.vm.$data.dateOptions)
    const postDate = wrapper.find('[data-cm-qa="formatted-date"]')
    expect(postDate.text()).toEqual(testDate)
  })

  it('dispatches delete post action correctly', async () => {
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const deleteBtn = wrapper.find('[data-cm-qa="delete-btn"]')
    // was ist besser knopf mit data-cm-qa oder mit icon Klasse??
    // const deleteBtn = wrapper.find('.mdi-delete-outline')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')
    expect(mockDispatch).toHaveBeenCalledWith('deletePost', testPost)

    // do not call router.push if you are already in the home page
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled()

    wrapper.vm.$route.name = 'post-page'
    await Vue.nextTick()
    await deleteBtn.trigger('click')
    // goes back to home if post gets deleted from PostPage
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home' })
  })

  it('dispatches edit post action corectly', async () => {
    const wrapper = render()
    const editBtn = wrapper.find('[data-cm-qa="edit-btn"]')
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()

    expect(editBtn.exists()).toBe(true)
    await editBtn.trigger('click')

    expect(mockDispatch).toHaveBeenNthCalledWith(1, 'updateCurrentPost', testPost)
    expect(mockDispatch).toHaveBeenNthCalledWith(2, 'openInputDialog')
  })
})
