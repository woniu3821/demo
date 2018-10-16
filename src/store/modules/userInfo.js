// import axios from "@/utils/axios";

const state = {
  phoneObj: {
    show: false,
    cellPhone: ""
  }
};

const getters = {};

const mutations = {
  SET_PHONE(state, data) {
    state.phoneObj = data;
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
