import Vue from 'vue'
import Vuex from 'vuex'
import func from './global-func'
import {router} from "./router";

Vue.use(Vuex);
const fc = func();

export default new Vuex.Store({
  state: {
    isMobile: false,
    cooldown: 0,
    avatar_3d: false,
    ban_ip: false,
    admin: false,
    session: ''
  },
  mutations: {
    updateMobile(state, boolean){
      state.isMobile = boolean
    },
    setCooldown(state, cooldown){
      state.cooldown = cooldown;
    },
    set3D(state, boolean) {
      state.avatar_3d = boolean
    },
    setIP(state, isIP) {
      state.ban_ip = isIP
    },
    setLogin(state, boolean) {
      state.admin = boolean
    },
    setSession(state, id) {
      state.session = id;
    }
  },
  actions: {
    setSession({commit}, obj) {
      commit('setLogin', true);
      commit('setSession', obj.uuid);
      if (obj.remember) fc.setCookie("minestrike_session", obj.uuid, 7);
      router.push('/admin')
    },
    loadSession({state, commit}) {
      if (state.session) return;
      const id = fc.getCookie("minestrike_session");
      if (id == null) return;
      commit('setSession', id);
      return new Promise(resolve => resolve());
    },
    logout({commit}) {
      commit('setLogin', false);
      commit('setSession', '');
      fc.delCookie("minestrike_session");
      router.push('/');
    }
  }
})
