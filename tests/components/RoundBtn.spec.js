import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import RoundBtn from '@/components/RoundBtn.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')

  document.body.append(div)
  return mount(RoundBtn, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate },
    // added slots mounting option
    slots: {
      default: 'some text'
    },
    // added props, in small round btn tooltip text passed as prop
    propsData: {
      tooltipText: 'tooltip text'
    }
  })
}

describe('round button', () => {
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

  it('renders tooltip correctly', async () => {
    const wrapper = render()
    wrapper.setData({ showTooltip: true })
    await Vue.nextTick()

    expect(wrapper.vm.$data.showTooltip).toBe(true)

    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBe(true)

    const tooltipText = tooltip.text()
    expect(tooltipText).toBe('tooltip text')
    utils.debugDom(wrapper)
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

  it('emits correctly', async () => {
    const wrapper = render()
    wrapper.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
