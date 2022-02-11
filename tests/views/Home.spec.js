import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import Home from '@/views/Home.vue'
import { testPost, testPost2, testPost3 } from '../helpers/testHelpers'

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
      $store: {
        state: {
          posts: [testPost, testPost2, testPost3]
        }
        // i get an error if I don't define dispatch as a mock in the test
        // dispatch: jest.fn()
      }
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

  it('displays language selector', () => {
    const wrapper = render()
    const languageSelector = wrapper.find('[ data-cm-qa="language-selector"')
    expect(languageSelector.exists()).toBe(true)
  })

  it('shows fallback text if there are no posts', async () => {
    const wrapper = render()
    wrapper.vm.$store.state.posts = []
    await Vue.nextTick()
    const fallback = wrapper.find('h1')
    expect(fallback.text()).toBe('**There are no blog posts**')
  })

  it('shows available posts', () => {
    const wrapper = render()
    const cards = wrapper.findAll('.v-card')
    // the number of displayed posts must equal the length of the posts array
    expect(cards.length).toEqual(wrapper.vm.$store.state.posts.length)
  })

  it('displays the filters if there are posts', () => {
    const wrapper = render()
    const filtersContainer = wrapper.find('[data-cm-qa="filters-container"]')
    expect(filtersContainer.exists()).toBe(true)
  })

  it('dispatches open input dialog function', async () => {
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    await wrapper.find('[data-cm-qa="add-new-btn"').trigger('click')
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('calls updateFilters function correctly', async () => {
    const spyUpdateFilters = jest.spyOn(Home.methods, 'updateFilters')
    const spyFilterPosts = jest.spyOn(Home.methods, 'filterPosts')
    const wrapper = render()

    await wrapper.find('[data-cm-qa="category-select"]').trigger('input')
    expect(spyUpdateFilters).toHaveBeenCalled()
    expect(spyFilterPosts).toHaveBeenCalled()
  })

  it('filters posts by category', async () => {
    const wrapper = render()
    await wrapper.setData({
      filters: {
        category: testPost2.category,
        date: false,
        searchTerm: ''
      }
    })

    const cards = wrapper.findAll('.v-card')
    // search for the title in the first and only item in cards array
    const postTitle = cards.at(0).find('.v-list-item__title')
    expect(cards.length).toBe(1)
    expect(postTitle.text()).toEqual(testPost2.title)
  })

  it('filters posts by search term', async () => {
    const wrapper = render()
    await wrapper.setData({
      filters: {
        category: '',
        date: false,
        searchTerm: testPost.content
      }
    })
    const cards = wrapper.findAll('.v-card')
    const post1Title = cards.at(0).find('.v-list-item__title')
    const post2Title = cards.at(1).find('.v-list-item__title')
    expect(cards.length).toBe(2)
    expect(post1Title.text()).toEqual(testPost.title)
    // testPost3 content includes search term
    expect(post2Title.text()).toEqual(testPost3.title)
  })

  it('sorts posts by date', async () => {
    const wrapper = render()
    await wrapper.setData({
      filters: {
        category: '',
        date: true,
        searchTerm: ''
      }
    })

    const cards = wrapper.findAll('.v-card')
    // search for the title in the first and only item in cards array
    const post1Title = cards.at(0).find('.v-list-item__title')
    expect(post1Title.text()).toEqual(testPost2.title)
  })
})
