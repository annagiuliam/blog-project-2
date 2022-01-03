import Vue from "vue";
import Router from "vue-router";
import TestPage from "./../views/TestPage";

Vue.use(Router);

export default new Router({
  routes: [{ path: "/test-page", component: TestPage }],
});
