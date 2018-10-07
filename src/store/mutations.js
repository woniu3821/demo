import {
  DEMO_FRESH_WEATHER,
  SET_USERINFO_DETAIL,
  MENU_UPDATA,
  SET_USER_TYPE
} from "./types";

export default {
  [DEMO_FRESH_WEATHER](state, payload) {
    state.WEATHER = `远程返回：${payload.data.showapi_res_error}`;
  },
  [SET_USERINFO_DETAIL](state, data) {
    state.userDetail = data;
  },
  [MENU_UPDATA](state, data) {
    state.routeList = data;
  },
  [SET_USER_TYPE](state, data) {
    state.userType = data;
  }
};
