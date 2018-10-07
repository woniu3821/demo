const getters = {
  currentWeather(state) {
    return state.WEATHER;
  },
  userDetail(state) {
    return state.userDetail;
  },
  userTypeName(state) {
    if (state.userType !== undefined) {
      return state.userType == 1 ? "学生" : "教职工";
    } else {
      return "";
    }
  },
  routeList(state) {
    state.routeList.forEach(item => {
      // let tag = item.params.name == 1 ? "学生" : "教职工";
      switch (item.name) {
        case "view-user-info":
          item.meta.name = "用户信息";
          item.meta.icon = "md-settings";
          break;
        case "add-user":
          item.meta.name = `新增用户`;
          item.meta.icon = "";
          break;
        case "user-info-detail":
          item.meta.name = `用户详情`;
          item.meta.icon = "";
          break;
        default:
          break;
      }
    });
    return state.routeList;
  }
};
export default getters;
