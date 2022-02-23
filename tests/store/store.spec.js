import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'
import Vuex from 'vuex'
import isEqual from 'lodash/isequal'

import { storeConfig } from '../../src/store/store'
import { testPost, testPost2 } from '../helpers/testHelpers'

Vue.use(Vuex)

let store

const createStore = () => {
  store = new Vuex.Store(cloneDeep(storeConfig))
}

beforeEach(() => {
  document.body.innerHTML = null
  createStore()
  jest.clearAllMocks()
})

describe('store state', () => {
  it('state is initialized correctly', () => {
    expect(store.state.currentPost).toBe(null)
    expect(store.state.posts.length).toEqual(0)
    expect(store.state.inputDialog).toBe(false)
  })
})

describe('mutations with posts', () => {
  beforeEach(() => {
    store.commit('addNewPost', testPost)
  })

  it('addNewPost', async () => {
    store.commit('addNewPost', testPost2)
    expect(store.state.posts).toEqual([testPost, testPost2])
  })

  it('deletePost', async () => {
    await store.commit('addNewPost', testPost2)
    await store.commit('deletePost', testPost)
    expect(store.state.posts).toEqual([testPost2])
  })

  it('editPost', async () => {
    const tempPost = { ...testPost }
    tempPost.category = 'politics'
    tempPost.title = 'edited title'
    await store.commit('editPost', tempPost)
    const editedPost = store.state.posts[0]
    const postsAreEqual = isEqual(tempPost, editedPost)
    expect(postsAreEqual).toBe(true)
  })

  it('deleteAllPosts', async () => {
    await store.commit('addNewPost', testPost2)
    await store.commit('deleteAllPosts')
    expect(store.state.posts.length).toBe(0)
  })
})

describe('mutations with currentPost', () => {
  it('updateCurrentPost', async () => {
    await store.commit('updateCurrentPost', testPost)
    const postsAreEqual = isEqual(testPost, store.state.currentPost)
    expect(postsAreEqual).toBe(true)
  })

  it('clearCurrentPost', async () => {
    await store.commit('clearCurrentPost')
    expect(store.state.currentPost).toBe(null)
  })
})

describe('mutations with inputDialog', () => {
  it('openInputDialog', async () => {
    await store.commit('openInputDialog')
    expect(store.state.inputDialog).toBe(true)
  })

  it('closeInputDialog', async () => {
    await store.commit('closeInputDialog')
    expect(store.state.inputDialog).toBe(false)
  })
})

describe('actions with posts', () => {
  beforeEach(() => {
    store.dispatch('addNewPost', testPost)
  })

  it('addNewPost', async () => {
    await store.dispatch('addNewPost', testPost2)
    expect(store.state.posts).toEqual([testPost, testPost2])
  })

  it('deletePost', async () => {
    await store.dispatch('addNewPost', testPost2)
    await store.dispatch('deletePost', testPost)
    expect(store.state.posts).toEqual([testPost2])
  })

  it('editPost', async () => {
    const tempPost = { ...testPost }
    tempPost.category = 'politics'
    tempPost.title = 'edited title'
    await store.dispatch('editPost', tempPost)
    const editedPost = store.state.posts[0]
    const postsAreEqual = isEqual(tempPost, editedPost)
    expect(postsAreEqual).toBe(true)
  })

  it('deleteAllPosts', async () => {
    await store.dispatch('addNewPost', testPost2)
    await store.dispatch('deleteAllPosts')
    expect(store.state.posts.length).toBe(0)
  })
})

describe('actions with currentPost', () => {
  it('updateCurrentPost', async () => {
    await store.dispatch('updateCurrentPost', testPost)
    const postsAreEqual = isEqual(testPost, store.state.currentPost)
    expect(postsAreEqual).toBe(true)
  })

  it('clearCurrentPost', async () => {
    await store.dispatch('clearCurrentPost')
    expect(store.state.currentPost).toBe(null)
  })
})

describe('actions with inputDialog', () => {
  it('openInputDialog', async () => {
    await store.dispatch('openInputDialog')
    expect(store.state.inputDialog).toBe(true)
  })

  it('closeInputDialog', async () => {
    await store.dispatch('closeInputDialog')
    expect(store.state.inputDialog).toBe(false)
  })
})
