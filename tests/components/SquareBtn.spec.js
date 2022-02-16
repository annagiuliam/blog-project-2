import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import SquareBtn from '@/components/SquareBtn.vue'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')

  document.body.append(div)
  return mount(SquareBtn, {
    vuetify: new Vuetify(),
    attachTo: div,
    mocks: { $gettext: utils.mocks.translate },
    // added slots mounting option
    slots: {
      default: 'some text'
    }
  })
}
describe('square button', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = render()
    expect(wrapper.isVisible()).toEqual(true)
  })

  it('shows correct slot text', () => {
    const wrapper = render()
    expect(wrapper.html()).toContain('some text')
  })

  it('emits correctly', async () => {
    const wrapper = render()
    wrapper.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
