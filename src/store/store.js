import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export const storeConfig = {
  strict: true,
  state: {
    currentPost: null,
    posts: [],
    inputDialog: false,
    errorDialog: false,
    passwordDialog: false,
    password: '',
    serverUrl: 'http://localhost:8000/posts/'
  },

  mutations: {
    // posts
    getPosts: (state, payload) => {
      state.posts = [...payload]
    },
    addNewPost: (state, payload) => {
      state.posts.push(payload)
    },
    deletePost: (state, postId) => {
      const filteredPosts = state.posts.filter((ele) => ele.id !== postId)
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
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
    // dialogs
    openInputDialog: (state) => {
      state.inputDialog = true
    },
    closeInputDialog: (state) => {
      state.inputDialog = false
    },
    closeErrorDialog: (state) => {
      state.errorDialog = false
      state.errorMessage = ''
    },
    closePasswordDialog: (state) => {
      state.passwordDialog = false
    },
    openPasswordDialog: (state) => {
      state.passwordDialog = true
    },
    // auth
    savePassword: (state, password) => {
      state.password = password
      console.log('saved password in mutation', state.password)
    },
    // error
    handleError: (state, errorMessage) => {
      state.errorDialog = true
      state.errorMessage = errorMessage
    }
  },

  actions: {
    getPosts: async ({ commit, state }) => {
      try {
        const response = await axios.get(state.serverUrl)
        console.log(response.data)
        commit('getPosts', response.data)
      } catch (err) {
        commit('handleError', err.message)
      }
    },
    addNewPost: ({ commit }, payload) => {
      commit('addNewPost', payload)
    },
    deletePost: ({ commit }, postId) => {
      commit('deletePost', postId)
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
    // dialogs
    openInputDialog: ({ commit }) => {
      commit('openInputDialog')
    },
    closeInputDialog: ({ commit }) => {
      commit('closeInputDialog')
    },
    closeErrorDialog: ({ commit }) => {
      commit('closeErrorDialog')
    },
    closePasswordDialog: ({ commit }) => {
      commit('closePasswordDialog')
    },
    openPasswordDialog: ({ commit }) => {
      commit('openPasswordDialog')
    },

    savePassword: ({ commit }, password) => {
      commit('savePassword', password)
    },
    handleError: ({ commit }, errorMessage) => {
      commit('handleError', errorMessage)
    }

  }
}

export const store = new Vuex.Store(storeConfig)
