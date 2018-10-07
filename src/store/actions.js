import axios from "@/utils/axios";
import { DEMO_FRESH_WEATHER } from "./types";

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
export default actions;
