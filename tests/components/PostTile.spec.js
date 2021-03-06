import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import PostTile from '@/components/PostTile.vue'
import { testPost } from '../../tests/helpers/testHelpers'

Vue.use(Vuetify)

const mockRouter = {
  push: jest.fn()
}

const mockRoute = {
  name: 'post-page',
  params: { postId: testPost.id }
}

function render () {
  const div = document.createElement('div')

  document.body.append(div)
  return mount(PostTile, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: {
      $gettext: utils.mocks.translate,
      $language: {
        current: 'de-DE'
      },
      $router: mockRouter,
      $route: mockRoute
    },
    propsData: {
      post: testPost
    }
  })
}

describe('post tile', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })
  it('handles no post found', async () => {
    const wrapper = render()

    await wrapper.setProps({ post: null })
    const fallBackText = wrapper.find('[data-cm-qa="fallback-text"]')
    expect(fallBackText.text()).toBe('**No post to display**')
  })

  it('triggers router', async () => {
    const wrapper = render()
    const readBtn = wrapper.find('[data-cm-qa="read-btn"]')

    await readBtn.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith(mockRoute)
    const routePostId = mockRouter.push.mock.calls[0][0].params.postId
    expect(routePostId).toEqual(testPost.id)
  })
})
