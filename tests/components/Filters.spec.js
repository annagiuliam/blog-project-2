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
    utils.debugDom(wrapper)
    console.log(wrapper.vm.$data)
    expect(wrapper.isVisible()).toEqual(true)
  })
})
