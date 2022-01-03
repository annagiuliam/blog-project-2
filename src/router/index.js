import Vue from "vue";
import Router from "vue-router";

import Home from "./../views/Home";
import TestPage from "./../views/TestPage";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: Home },
    { path: "/test-page", component: TestPage },
  ],
});
