import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const storeConfig = {
  strict: true,
  state: {
    currentPost: null,
    posts: [],
    inputDialog: false
  },

  mutations: {
    addNewPost: (state, payload) => {
      state.posts.push(payload)
    },
    deletePost: (state, payload) => {
      const filteredPosts = state.posts.filter((ele) => ele.id !== payload.id)
      state.posts = [...filteredPosts]
    },
    editPost: (state, payload) => {
      const newPost = { ...payload }
      const index = state.posts.findIndex((post) => post.id === payload.id)
      state.posts.splice(index, 1, newPost)
    },
    deleteAllPosts: (state) => {
      state.posts = []
    },
    updateCurrentPost: (state, payload) => {
      state.currentPost = { ...payload }
    },

    openInputDialog: (state) => {
      state.inputDialog = true
    },
    closeInputDialog: (state) => {
      state.inputDialog = false
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    }

  },

  actions: {
    addNewPost: ({ commit }, payload) => {
      commit('addNewPost', payload)
    },
    deletePost: ({ commit }, payload) => {
      commit('deletePost', payload)
    },
    editPost: ({ commit }, payload) => {
      commit('editPost', payload)
    },
    deleteAllPosts: ({ commit }) => {
      commit('deleteAllPosts')
    },
    updateCurrentPost: ({ commit }, payload) => {
      commit('updateCurrentPost', payload)
    },
    clearCurrentPost: ({ commit }) => {
      commit('clearCurrentPost')
    },
    openInputDialog: ({ commit }) => {
      commit('openInputDialog')
    },
    closeInputDialog: ({ commit }) => {
      commit('closeInputDialog')
    }

  }
}

export const store = new Vuex.Store(storeConfig)
