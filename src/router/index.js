import Vue from "vue";
import store from "../store";
import Router from "vue-router";
import whiteList from "./directAccess";
import asyncRouter from "@/router/asyncRouter";

const reg1 = /(.*\/)*([^.]+).*/gi; //获取文件名

// 全局注册组件
const requireBaseComponent = require.context(
  // 其组件目录的相对路径
  "@/components",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
);

requireBaseComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireBaseComponent(fileName);

  // 获取组件的 PascalCase 命名
  // const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  const componentName = fileName.replace(reg1, "$2");
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

//获取view下的组件，注册路由
const requireViewComponent = require.context("@/views", true, /[A-Z]\w+\.vue$/);

const routes = requireViewComponent.keys().map(fileName => {
  // 获取组件配置
  const componentConfig = requireViewComponent(fileName);

  // 剥去文件名开头的 `./` 和结尾的扩展名
  const componentName = fileName.replace(reg1, "$2");
  // 转驼峰命名
  const camelName = componentName
    .replace(/(?<!\b)(?=[A-Z])/g, "-")
    .toLowerCase();
  // 全局注册组件
  const component = Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );

  return {
    path: `/${componentName}`,
    name: camelName,
    component
  };
});
// if (Cookies.get("token")) {
//   store.dispatch("user/relogin");
// }
Vue.use(Router);
const router = new Router({
  // mode: 'history',
  routes: [...asyncRouter, ...routes]
});

// 路由跳转前验证
var routeList = [];
router.beforeEach((to, from, next) => {
  var index = -1;
  routeList.find((item, num) => {
    if (item.name == to.name) index = num;
  });
  if (index !== -1) {
    //如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1);
  } else {
    routeList.push(to);
  }
  store.commit("MENU_UPDATA", routeList);
  next();
  // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
  if (store.state.menus.length === 0) {
    // 获取权限列表，如果失败则跳回登录页重新登录
    store
      .dispatch("permission/getPermission")
      .then(res => {
        // 匹配并生成需要添加的路由对象
        router.addRoutes(res);
        next(to.path);
      })
      .catch(() => {
        store.dispatch("user/logout").then(() => {
          router.replace("/login");
        });
      });
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.indexOf(to.path) >= 0) {
      next();
    } else {
      next();
      // router.replace("/login");
    }
  }
});

export default router;
