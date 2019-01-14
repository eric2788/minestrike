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
    tutorial_json: [],
    weapons_json: [],
    home_json: [],
    donation_json: [],
    staff_json: [],
    sidebar_json: [],
    footer_json: {},
    social_json: []
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
    },
    setTutorial(state, val) {
      state.tutorial_json = val
    },
    setWeapons(state, val) {
      state.weapons_json = val
    },
    setHome(state, val) {
      state.home_json = val
    },
    setDonation(state, val) {
      state.donation_json = val
    },
    setStaff(state, val) {
      state.staff_json = val
    },
    setSideBar(state, val) {
      state.sidebar_json = val
    },
    setFooter(state, val) {
      state.footer_json = val
    },
    setSocial(state, val) {
      state.social_json = val
    }
    //not working!
    /*setJSON(state, { weapon, home, donation, staff, sidebar, footer, social}){
      state.weapons_json = weapon;
      state.home_json = home;
      state.donation_json = donation;
      state.staff_json = staff;
      state.sidebar_json = sidebar;
      state.footer_json = footer;
      state.social_json = social;
    }*/
  },
  actions: {
    updateMobile({commit},mobile){
      commit('updateMobile', mobile)
    }
  }
})
