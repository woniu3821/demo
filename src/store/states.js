export default {
  loading: false, //全局遮罩loading
  userDetail: {},
  userType: "",
  menus: [
    {
      key: "0200",
      title: "用户信息",
      path: "/viewUserInfo",
      icon: "md-settings",
      menuLeaf: true,
      children: [
        {
          key: "0201",
          title: "用户详情",
          path: "/userInfoDetail",
          // icon: "ios-cog-outline",
          inner: true
        },
        {
          key: "0202",
          title: "用户管理",
          path: "/addUser",
          // icon: "ios-cog-outline",
          inner: true
        }
      ]
    }
  ]
};
