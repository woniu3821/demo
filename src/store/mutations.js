import { SET_USERINFO_DETAIL, SET_USER_TYPE, GET_TEACHER_INFO } from "./types";
export default {
  changeLoading(state, data) {
    state.loading = data;
  },
  [SET_USERINFO_DETAIL](state, data) {
    state.userDetail = data;
  },
  [SET_USER_TYPE](state, data) {
    state.userType = data;
  },
  [GET_TEACHER_INFO](state, data) {
    state.teacherInfo = data;
  }
};
