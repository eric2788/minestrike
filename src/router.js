import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import func from './global-func'


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '',
      components: {
        default: () => import('./views/FrontPage.vue')
      },
      children: [
        {
          path: '',
          components: {
            main: () => import('./views/front/Home.vue')
          }
        },
        {
          path: 'announce',
          name: 'Announces',
          components: {
            main: () => import('./views/front/Announce.vue')
          }
        },
        {
          path: 'leaderboards',
          name: 'LeaderBoards',
          components: {
            main: () => import('./views/front/Leaderboard.vue')
          }
        },
        {
          path: 'weapons',
          name: 'Weapons',
          components: {
            main: () => import('./views/front/Weapons.vue')
          }
        },
        {
          path: 'about',
          name: 'About',
          components: {
            main: () => import('./views/front/About.vue')
          }
        },
        {
          path: 'banlist',
          name: 'BanList',
          components: {
            main: () => import('./views/front/BanRecords.vue')
          }
        },
        {
          path: 'donate',
          name: 'Donation',
          components: {
            main: () => import('./views/front/Donation.vue')
          }
        },
        {
          path: '/tutorials',
          name: 'Tutorials',
          components: {
            main: () => import('./views/front/Tutorial.vue')
          }
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('./views/Panel.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.state.admin && !store.state.session) {
          window.console.log('用戶尚未登入，轉移到登入界面。');
          next('/login');
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          components: {
            home: () => import('./views/panel/Home.vue'),
            announce: () => import('./views/panel/Announce.vue'),
            about: () => import('./views/panel/About.vue'),
            donate: () => import('./views/panel/Donations.vue'),
            tutorial: () => import('./views/panel/Tutorials.vue'),
            weapon: () => import('./views/panel/Weapons.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: (to, from, next) => {
        if (store.state.admin && store.state.session) {
          next('/admin')
        } else {
          next();
        }
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  func().toTop();
  next();
});

export default router;
