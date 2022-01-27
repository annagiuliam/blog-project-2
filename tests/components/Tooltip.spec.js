import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Tooltip from '@/components/Tooltip.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  // const wrap = document.createElement('div')
  // wrap.classList.add('v-application--wrap')
  // document.body.append(div, wrap)
  document.body.append(div)
  return mount(Tooltip, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate },
    // added slots mouting option
    slots: {
      default: 'tooltip test'
    }
  })
}

describe('tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('show correct slot text', () => {
    const wrapper = render()
    expect(wrapper.html()).toContain('tooltip test')
  })
})
