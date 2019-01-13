import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/leaderboards',
      name: 'LeaderBoards',
      component: ()=>import('./views/Leaderboard.vue')
    },
    {
      path: '/weapons',
      name: 'Weapons',
      component: () => import('./views/Weapons.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    }
  ]
})
