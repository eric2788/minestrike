import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
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
    },
    {
      path: '/banlist',
      name: 'BanList',
      component: () => import('./views/BanRecords.vue')
    },
    {
      path: '/donate',
      name: 'Donation',
      component: () => import('./views/Donation.vue')
    },
    {
      path: '/tutorials',
      name: 'Tutorials',
      component: () => import('./views/Tutorial.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue')
    },
  ]
})
