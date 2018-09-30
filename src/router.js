import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Demo from "./views/Demo.vue";
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/demo"
    },
    {
      path: "/demo",
      name: "demo",
      component: Demo
    },
    {
      path: "/userInfo",
      name: "userInfo",
      component: () => import("./views/userInfo/ViewUserInfo.vue")
    }
  ]
});
