import Demo from "./views/Demo.vue";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "demo",
      redirect: Demo
    },
    {
      path: "/demo",
      name: "demo",
      component: Demo
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/About.vue")
    }
  ]
});
