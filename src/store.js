import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: false,
    cooldown: 0,
      avatar_3d: false,
      ban_ip: false,
      tutorial: '',
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
      setTutType(state, type) {
          state.tutorial = type
      }
  },
  actions: {
    updateMobile({commit},mobile){
      commit('updateMobile', mobile)
    }
  }
})
