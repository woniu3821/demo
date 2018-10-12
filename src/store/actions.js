import { fetch } from "@/utils/utils";
import { Message } from "iview";
import {
  // DEMO_FRESH_WEATHER,
  GET_TEACHER_INFO,
  GET_USER_INFO,
  GET_USER_DEPT,
  GET_USER_MAJOR,
  GET_USER_TYPE,
  GET_USER_STATUS,
  DEL_USER,
  EXPORT_USER,
  SET_USER_STATUS,
  SET_USER_PASSWD,
  ADD_USER_STU,
  GET_STU_CATEGORY,
  GET_USER_MAJOR_OLD,
  GET_USER_DEPT_OLD,
  GET_USER_STU,
  GET_CLASS_LIST
} from "./types";

const actions = {
  // async [DEMO_FRESH_WEATHER]({ commit }) {
  //   let pms = {
  //     "showapi_appid ": "59166",
  //     "showapi_sign ": "7e6cee7e3046484fa4bd15869b0640fb",
  //     "showapi_timestamp ": "20180314161610",
  //     "city ": "南京"
  //   };
  //   const data = await axios.post("http://route.showapi.com/104-29", pms);
  //   commit(DEMO_FRESH_WEATHER, data);
  // },
  showMsg({ commit }, data) {
    try {
      Message[data.type || "success"]({ content: data.content });
    } catch (err) {
      console.error("请输入正确类型");
    }
  },
  [GET_TEACHER_INFO]({ commit }, params) {
    return fetch("statics/meta-info/user_addOrUpdateTeacher.json", params);
  },
  [GET_USER_INFO]({ commit }, params) {
    return fetch("/userv2/getUserByCondition", params, "post");
  },
  [GET_USER_DEPT]({ commit }, params) {
    return fetch("/userv2/getUserDept", params, "post");
  },
  [GET_USER_DEPT_OLD]({ commit }, params) {
    return fetch("/code/stuDept", params, "post");
  },
  [GET_USER_MAJOR]({ commit }, params) {
    return fetch("/userv2/getUserMajor", params, "post");
  },
  [GET_USER_MAJOR_OLD]({ commit }, params) {
    return fetch("/code/major", params, "post");
  },
  [GET_USER_TYPE]({ commit }, params) {
    return fetch("/userv2/getUserType", params, "post");
  },
  [GET_USER_STATUS]({ commit }, params) {
    return fetch("/userv2/getUserStatus", params, "post");
  },
  [DEL_USER]({ commit }, params) {
    return fetch("/userv2/delUser", params, "post");
  },
  [EXPORT_USER]({ commit }, params) {
    return fetch("/userv2/exportUser", params);
  },
  [SET_USER_STATUS]({ commit }, params) {
    return fetch("/userv2/setUserStatus", params, "post");
  },
  [SET_USER_PASSWD]({ commit }, params) {
    return fetch("/userv2/setUserPasswd", params, "post");
  },
  [ADD_USER_STU]({ commit }, params) {
    return fetch("/user/addOrUpdateStu", params, "post");
  },
  [GET_STU_CATEGORY]({ commit }, params) {
    return fetch("/code/stuCategory", params, "post");
  },
  [GET_USER_STU]({ commit }, params) {
    return fetch("/code/stuType", params, "post");
  },
  [GET_CLASS_LIST]({ commit }, params) {
    return fetch("/code/class", params, "post");
  }
};
export default actions;
