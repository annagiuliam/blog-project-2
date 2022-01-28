import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import GoBackBtn from '@/components/GoBackBtn.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  return mount(GoBackBtn, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate }
  })
}

describe('go back button', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('does not render the tooltip at first render', () => {
    const wrapper = render()
    expect(wrapper.vm.$data.showTooltip).toBe(false)
    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(false)
  })

  it.only('renders tooltip correctly', async () => {
    const wrapper = render()
    wrapper.setData({ showTooltip: true })
    await Vue.nextTick()

    expect(wrapper.vm.showTooltip).toBe(true)

    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(true)

    const tooltipText = tooltip.text()
    expect(tooltipText).not.toBe('')
    utils.debugDom(wrapper)
  })
})
