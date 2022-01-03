import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    currentPost: null,
    posts: [],
    categories: ["Politik", "Natur", "Aktuell", "Umwelt"],
    postDialog: false,
    inputDialog: false,
  },

  mutations: {
    addNewPost: (state, payload) => {
      state.posts.push(payload);
      console.log("addNewPost", state.posts);
    },
    deletePost: (state, payload) => {
      let filteredPosts = state.posts.filter((ele) => ele.id !== payload.id);
      state.posts = [...filteredPosts];
    },
    editPost: (state, payload) => {
      let newPost = { ...payload };
      let index = state.posts.findIndex((post) => post.id === payload.id);
      state.posts.splice(index, 1, newPost);
      console.log("editPost", state.posts);
    },
    deleteAllPosts: (state) => {
      state.posts = [];
    },
    updateCurrentPost: (state, payload) => {
      state.currentPost = { ...payload };
      console.log(state.currentPost);
    },
    openPostDialog: (state) => {
      state.postDialog = true;

      console.log("PostDialog", state.postDialog);
    },
    closePostDialog: (state) => {
      state.postDialog = false;
      console.log("PostDialog", state.postDialog);
    },
    openInputDialog: (state) => {
      state.inputDialog = true;

      console.log("InputDialog", state.inputDialog);
    },
    closeInputDialog: (state) => {
      state.inputDialog = false;
      console.log("InputDialog", state.inputDialog);
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
      console.log(state.currentPost);
    },
  },

  actions: {
    addNewPost: ({ commit }, payload) => {
      commit("addNewPost", payload);
    },
    deletePost: ({ commit }, payload) => {
      commit("deletePost", payload);
    },
    editPost: ({ commit }, payload) => {
      commit("editPost", payload);
    },
    deleteAllPosts: ({ commit }) => {
      commit("deleteAllPosts");
    },
    updateCurrentPost: ({ commit }, payload) => {
      commit("updateCurrentPost", payload);
    },
    openPostDialog: ({ commit }) => {
      commit("openPostDialog");
    },
    closePostDialog: ({ commit }) => {
      commit("closePostDialog");
      commit("clearCurrentPost");
    },
    openInputDialog: ({ commit }) => {
      commit("openInputDialog");
    },
    closeInputDialog: ({ commit }) => {
      commit("closeInputDialog");
    },
    clearCurrentPost: ({ commit }) => {
      commit("clearCurrentPost");
    },
  },
});
