import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: false,
    cooldown: 0,
  },
  mutations: {
    updateMobile(state, boolean){
      state.isMobile = boolean
    },
    setCooldown(state, cooldown){
      state.cooldown = cooldown;
    }
  },
  actions: {
    updateMobile({commit},mobile){
      commit('updateMobile', mobile)
    }
  }
})
