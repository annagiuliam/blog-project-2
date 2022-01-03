import Vue from "vue";
import Router from "vue-router";

import Home from "./../views/Home";
import PostPage from "./../views/PostPage";
import TestPage from "./../views/TestPage";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: Home },
    { path: "/post-page/:id", name: "post-page", component: PostPage },
    { path: "/test-page", component: TestPage },
  ],
});
