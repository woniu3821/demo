// import axios from "@/utils/axios";
import { SET_PHONE, CONTINUE } from "@/store/types";
const state = {
  phoneObj: {
    show: false,
    cellPhone: ""
  },
  continue: false
};

const getters = {};

const mutations = {
  [SET_PHONE](state, data) {
    state.phoneObj = data;
  },
  [CONTINUE](state, data) {
    state.continue = data;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
