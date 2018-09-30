import { DEMO_FRESH_WEATHER } from "./types";

export default {
  [DEMO_FRESH_WEATHER](state, payload) {
    state.WEATHER = `远程返回：${payload.data.showapi_res_error}`;
  }
};
