import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import CloseBtn from '@/components/CloseBtn.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  // const wrap = document.createElement('div')
  // wrap.classList.add('v-application--wrap')
  // document.body.append(div, wrap)
  document.body.append(div)
  return mount(CloseBtn, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate }
  })
}

describe('close button', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
    // utils.debugDom(wrapper)
  })

  it('does not render the tooltip at first render', () => {
    const wrapper = render()
    expect(wrapper.vm.$data.showTooltip).toBe(false)
    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(false)
  })

  it('renders tooltip correctly', async () => {
    const wrapper = render()
    wrapper.setData({ showTooltip: true })
    await Vue.nextTick()

    expect(wrapper.vm.$data.showTooltip).toBe(true)

    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(true)

    const tooltipText = tooltip.text()
    expect(tooltipText).not.toBe('')
  })

  it('shows tooltip on mouseover', async () => {
    const wrapper = render()
    await wrapper.find('button').trigger('mouseover')
    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(true)
    // utils.debugDom(wrapper)
  })

  it('hides tooltip on mouseleave', async () => {
    const wrapper = render()

    wrapper.setData({ showTooltip: true })
    await Vue.nextTick()
    await wrapper.find('button').trigger('mouseleave')
    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(false)
    utils.debugDom(wrapper)
  })
})
