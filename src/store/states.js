import { getHomeRoute } from "@/utils/utils";
import routers from "@/router/asyncRouter.js";
export default {
  loading: false, //全局遮罩loading
  WEATHER: "初始信息",
  title: "测试应用",
  userDetail: {},
  routeList: [],
  teacherInfo: {},
  userType: "",
  breadCrumbList: [],
  homeRoute: getHomeRoute(routers),
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
    {
      key: "02",
      title: "用户信息",
      path: "/viewUserInfo",
      icon: "ios-cog-outline"
    }
  ]
};
