import {
  DEMO_FRESH_WEATHER,
  SET_USERINFO_DETAIL,
  MENU_UPDATA,
  SET_USER_TYPE,
  GET_TEACHER_INFO
} from "./types";
import { getBreadCrumbList } from "@/utils/utils";
export default {
  setBreadCrumb(state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
  },
  changeLoading(state, data) {
    state.loading = data;
  },
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
  },
  [GET_TEACHER_INFO](state, data) {
    state.teacherInfo = data;
  }
};
