import Vue from "vue";
import Router from "vue-router";

import Home from "./../views/Home";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/post-page/:postId",
      name: "post-page",
      component: () =>
        import(/* webpackChunkName: 'post-page'*/ "./../views/PostPage"),
      props: true,
    },
  ],
});
