import demo from "./modules/demo";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "测试应用",
    menus: [
      {
        key: "01",
        title: "演示",
        path: "/",
        icon: "ios-cog-outline",
        children: [
          {
            key: "0101",
            title: "演示1",
            path: "/1",
            icon: "ios-cog-outline",
            children: [
              {
                key: "010101",
                title: "演示11",
                path: "/demo",
                icon: "ios-cog-outline"
              },
              {
                key: "010102",
                title: "演示12",
                path: "/12",
                icon: "ios-cog-outline"
              }
            ]
          },
          {
            key: "0102",
            title: "演示2",
            path: "/2",
            icon: "ios-cog-outline",
            children: [
              {
                key: "010201",
                title: "演示21",
                path: "/21",
                icon: "ios-cog-outline"
              },
              {
                key: "010202",
                title: "演示22",
                path: "/22",
                icon: "ios-cog-outline"
              }
            ]
          }
        ]
      },
      { key: "02", title: "关于", path: "/about", icon: "ios-cog-outline" }
    ]
  },
  modules: {
    demo
  },
  mutations: {},
  actions: {}
});
