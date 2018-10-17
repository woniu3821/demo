import Vue from "vue";
import Vuex from "vuex";
import vuexModules from "./modules";
import state from "./states";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
  // strict: true,
  actions,
  getters,
  state,
  mutations,
  modules: vuexModules
});
