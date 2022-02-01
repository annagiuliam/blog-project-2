import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Filters from '@/components/Filters.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(Filters, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate }
  })
}

describe('filters component', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })
  it('renders', () => {
    const wrapper = render()
    console.log(wrapper.vm.$data)
    expect(wrapper.isVisible()).toEqual(true)
  })

  // correct??
  it('selects category correctly', async () => {
    const wrapper = render()
    const select = wrapper.find('[data-cm-qa="category-select"]')

    select.setValue('politics')
    await Vue.nextTick()
    expect(wrapper.vm.$data.filters.category).toBe('politics')
  })

  it('updates filters on category input', async () => {
    const spyUpdateFilters = jest.spyOn(Filters.methods, 'updateFilters')
    const wrapper = render()
    const select = wrapper.find('[data-cm-qa="category-select"]')
    await select.trigger('input')
    expect(spyUpdateFilters).toHaveBeenCalled()
  })

  it('inputs search term correctly', async () => {
    const wrapper = render()
    const termInput = wrapper.find('[data-cm-qa="term-input"]')
    expect(termInput.exists()).toBe(true)

    termInput.setValue('abc')
    await Vue.nextTick()
    expect(wrapper.vm.$data.filters.searchTerm).toBe('abc')
  })

  it('updates filters on term input', async () => {
    const spyUpdateFilters = jest.spyOn(Filters.methods, 'updateFilters')
    const wrapper = render()
    const select = wrapper.find('[data-cm-qa="term-input"]')
    await select.trigger('input')
    expect(spyUpdateFilters).toHaveBeenCalled()
  })

  it('activates date sorting correctly', async () => {
    const spy = jest.spyOn(Filters.methods, 'sortByDate')
    const wrapper = render()
    const dateBtn = wrapper.find('[data-cm-qa="date-btn"]')
    utils.debugDom(wrapper)
    expect(dateBtn.exists()).toBe(true)

    await Vue.nextTick()
    // console.log(wrapper.vm.sortByDate)
    // const spy = jest.spyOn(wrapper.vm, 'sortByDate')

    await dateBtn.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('runs sortByDate correctly', async () => {
    const wrapper = render()
    expect(wrapper.vm.$data.filters.date).toBe(false)
    await wrapper.vm.sortByDate()
    expect(wrapper.vm.$data.filters.date).toBe(true)
    expect(wrapper.emitted('updateFilters')).toBeTruthy()
  })

  it('dispatches delete all posts action', async () => {
    const spyDeleteAll = jest.spyOn(Filters.methods, 'deleteAllPosts')
    const wrapper = render()
    const deleteAllBtn = wrapper.find('[data-cm-qa="delete-all-btn"]')
    // expect(deleteAllBtn.exists()).toBe(true)

    await deleteAllBtn.trigger('click')
    expect(spyDeleteAll).toHaveBeenCalled()
    // Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'dispatch')"
  })
})
