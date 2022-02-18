import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import InputDialog from '@/components/InputDialog.vue'
import { testPost4 } from '../helpers/testHelpers'

Vue.use(Vuetify)

function render () {
  const div = document.createElement('div')
  document.body.append(div)
  document.body.setAttribute('data-app', true)
  return mount(InputDialog, {
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
          posts: [],
          inputDialog: true,
          currentPost: null
        }
      }
    }
  })
}

describe('input dialog', () => {
  beforeEach(() => {
    document.body.innerHTML = null
    jest.clearAllMocks()
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2020, 0, 1))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders form if inputDialog is true', () => {
    const wrapper = render()
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
  })

  it('displays new post title if current post is null', () => {
    const wrapper = render()
    const cardTitle = wrapper.find('.v-card__title > .text-h5')
    expect(cardTitle.text()).toEqual('**New Post**')
  })

  it('displays edit post title if there is a current post', async () => {
    const wrapper = render()
    wrapper.vm.$store.state.currentPost = testPost4
    await Vue.nextTick()
    const cardTitle = wrapper.find('.v-card__title > .text-h5')
    expect(cardTitle.text()).toEqual('**Edit Post**')
  })

  it('triggers close input dialog corrrectly', async () => {
    const spyCloseDialog = jest.spyOn(InputDialog.methods, 'closeInputDialog')
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const mockReset = wrapper.vm.$refs.form.reset = jest.fn()

    const closeBtn = wrapper.find('[data-cm-qa="close-btn"')
    await closeBtn.trigger('click')

    expect(spyCloseDialog).toHaveBeenCalled()
    expect(mockDispatch.mock.calls.length).toBe(2)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, 'closeInputDialog')
    expect(mockDispatch).toHaveBeenNthCalledWith(2, 'clearCurrentPost')
    expect(mockReset).toHaveBeenCalled()
  })

  it('does not dispatch if the form is not valid', async () => {
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const firstNameInput = wrapper.find('[data-cm-qa="first-name-input"]')
    await firstNameInput.setValue(testPost4.firstName)
    const sendBtn = wrapper.find('[data-cm-qa="save-btn"]')
    await sendBtn.trigger('click')
    // sendMessage gets called, but since the form is not valid, no dispatch action is executed
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('new post: calls the right dispatches with the right payload', async () => {
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const mockReset = wrapper.vm.$refs.form.reset = jest.fn()

    await wrapper.find('[data-cm-qa="first-name-input"]').setValue(testPost4.firstName)
    await wrapper.find('[data-cm-qa="middle-name-input"]').setValue(testPost4.middleName)
    await wrapper.find('[data-cm-qa="last-name-input"]').setValue(testPost4.lastName)
    await wrapper.find('[data-cm-qa="email-input"]').setValue(testPost4.email)
    await wrapper.find('[data-cm-qa="category-input"]').setValue(testPost4.category)
    await wrapper.find('[data-cm-qa="title-input"]').setValue(testPost4.title)
    await wrapper.find('[data-cm-qa="content-input"]').setValue(testPost4.content)

    const sendBtn = wrapper.find('[data-cm-qa="save-btn"]')
    await sendBtn.trigger('click')
    expect(mockDispatch.mock.calls.length).toBe(3)
    //  payload with addNewPost should have the same content of testPost4
    expect(mockDispatch).toHaveBeenNthCalledWith(1, 'addNewPost', testPost4)
    expect(mockDispatch).toHaveBeenNthCalledWith(2, 'closeInputDialog')
    expect(mockDispatch).toHaveBeenNthCalledWith(3, 'clearCurrentPost')
    expect(mockReset).toHaveBeenCalled()
  })

  it('edit post: fills postData if there is a current post to edit', async () => {
    const wrapper = render()
    wrapper.vm.$store.state.currentPost = testPost4
    await Vue.nextTick()
    const postData = wrapper.vm.$data.postData
    const postDataFilled = Object.values(postData).every(el => el !== '')
    expect(postDataFilled).toBe(true)
  })

  it('edit post: calls the right dispatches with edited data', async () => {
    const wrapper = render()
    const mockDispatch = wrapper.vm.$store.dispatch = jest.fn()
    const mockReset = wrapper.vm.$refs.form.reset = jest.fn()

    wrapper.vm.$store.state.currentPost = testPost4
    await Vue.nextTick()
    await wrapper.find('[data-cm-qa="category-input"]').setValue('politics')
    await wrapper.find('[data-cm-qa="title-input"]').setValue('changed title')

    const sendBtn = wrapper.find('[data-cm-qa="save-btn"]')
    await sendBtn.trigger('click')
    expect(mockDispatch.mock.calls.length).toBe(3)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, 'editPost', expect.any(Object))
    expect(mockDispatch).toHaveBeenNthCalledWith(2, 'closeInputDialog')
    expect(mockDispatch).toHaveBeenNthCalledWith(3, 'clearCurrentPost')
    expect(mockReset).toHaveBeenCalled()
  })

  it('edit post: clears postData when you close inputDialog', async () => {
    const wrapper = render()
    wrapper.vm.$store.state.currentPost = testPost4
    wrapper.vm.$store.state.inputDialog = false
    await Vue.nextTick()
    const postData = wrapper.vm.$data.postData
    const postDataCleared = Object.values(postData).every(el => el === '')
    expect(postDataCleared).toBe(true)
  })

  it('splits full name correctly into the name inputs', async () => {
    const wrapper = render()
    const fullNameInput = wrapper.find('[data-cm-qa="full-name-input"]')
    const firstNameInput = wrapper.find('[data-cm-qa="first-name-input"]')
    const middleNameInput = wrapper.find('[data-cm-qa="middle-name-input"]')
    const lastNameInput = wrapper.find('[data-cm-qa="last-name-input"]')

    await fullNameInput.setValue('first')
    expect(firstNameInput.element.value).toEqual('first')
    expect(middleNameInput.element.value).toEqual('')
    expect(lastNameInput.element.value).toEqual('')

    await fullNameInput.setValue('first last')
    expect(firstNameInput.element.value).toEqual('first')
    expect(middleNameInput.element.value).toEqual('')
    expect(lastNameInput.element.value).toEqual('last')

    await fullNameInput.setValue('first middle last')
    expect(firstNameInput.element.value).toEqual('first')
    expect(middleNameInput.element.value).toEqual('middle')
    expect(lastNameInput.element.value).toEqual('last')

    await fullNameInput.setValue('first middle last and more')
    expect(firstNameInput.element.value).toEqual('first')
    expect(middleNameInput.element.value).toEqual('middle')
    expect(lastNameInput.element.value).toEqual('last and more')

    await fullNameInput.setValue('')
    expect(firstNameInput.element.value).toEqual('')
    expect(middleNameInput.element.value).toEqual('')
    expect(lastNameInput.element.value).toEqual('')
  })

  it('displays full name correctly', async () => {
    const wrapper = render()

    const fullNameInput = wrapper.find('[data-cm-qa="full-name-input"]')
    const firstNameInput = wrapper.find('[data-cm-qa="first-name-input"]')
    const middleNameInput = wrapper.find('[data-cm-qa="middle-name-input"]')
    const lastNameInput = wrapper.find('[data-cm-qa="last-name-input"]')

    expect(fullNameInput.element.value).toEqual('')

    await firstNameInput.setValue('first')
    await lastNameInput.setValue('last')
    expect(fullNameInput.element.value).toEqual('first last')

    await middleNameInput.setValue('middle')
    expect(fullNameInput.element.value).toEqual('first middle last')
  })
})
