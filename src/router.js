import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import func from './global-func'
import {_axios} from "@/plugins/axios";

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
            main: () => import('./views/front/AnnounceList.vue')
          }
        },
        {
          path: 'announce/:id',
          name: 'Announce',
          components: {
            main: () => import('./views/front/AnnounceArticle.vue')
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
            weapon: () => import('./views/panel/Weapons.vue'),
            sidebar: () => import('./views/panel/Sidebar.vue'),
            socialfooter: () => import('./views/panel/SocialFooter.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: (to, from, next) => {
        store.dispatch('loadSession').then(() => {
          if (!store.state.session) {
            next();
            return;
          }
          _axios({
            method: 'post',
            url: 'auth/check?valid=' + store.state.session
          }).then(res => {
            if (res.data.success) {
              window.console.log("發現有效的 SessionId, 已成功自動登入。");
              store.commit('setLogin', true);
              next('/admin');
            } else {
              store.dispatch('logout').then();
              window.console.log("無效的 SessionId, 繼續留待登入界面。");
              next();
            }
          }).catch(err => window.console.log(err))
        });
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
