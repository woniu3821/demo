import { DEMO_FRESH_WEATHER } from "../Constants";

import axios from "@/utils/axios";

const state = {
  WEATHER: "初始信息"
};

const getters = {
  currentWeather(state) {
    return state.WEATHER;
  }
};

const mutations = {
  [DEMO_FRESH_WEATHER](state, payload) {
    state.WEATHER = `远程返回：${payload.data.showapi_res_error}`;
  }
};

const actions = {
  async [DEMO_FRESH_WEATHER]({ commit }) {
    let pms = {
      "showapi_appid ": "59166",
      "showapi_sign ": "7e6cee7e3046484fa4bd15869b0640fb",
      "showapi_timestamp ": "20180314161610",
      "city ": "南京"
    };
    const data = await axios.post("http://route.showapi.com/104-29", pms);
    commit(DEMO_FRESH_WEATHER, data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
