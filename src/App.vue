<template>
  <v-app>
      <v-navigation-drawer class="hidden-md-and-up" fixed slide-x-transition temporary v-model="nav">
          <v-toolbar flat>
              <v-list>
                  <v-list-tile>
                      <v-list-tile-title class="title">
                          導航
                      </v-list-tile-title>
                  </v-list-tile>
              </v-list>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list dense>
              <template v-for="(button,index) in buttons">
                  <v-list-tile :key="index" :to="button.to" @click.native="toTop()">
                      <v-list-tile-action>
                          <v-icon>{{button.icon}}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{button.name}}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </template>
          </v-list>
      </v-navigation-drawer>
    <v-toolbar flat class="info darken-4" dark>
        <v-toolbar-side-icon @click="nav = !nav" v-if="isMobile">
            <v-icon>menu</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="pr-2">MineStrike</v-toolbar-title>
        <template v-for="(btn,i) in buttons">
            <v-spacer :key="i" v-if="btn.to === '/about'"></v-spacer>
            <v-btn :key="btn.icon" :to="btn.to" flat v-if="!isMobile">{{btn.name}}</v-btn>
        </template>
    </v-toolbar>
    <v-container>
        <v-layout :class="isMobile ? 'column' : 'row'">
            <v-flex xs10>
                <router-view></router-view>
            </v-flex>
            <v-flex :class="isMobile ? 'pt-3' : 'pl-3'" xs2>
                <Sidebar></Sidebar>
            </v-flex>
        </v-layout>
    </v-container>
      <Footer></Footer>
  </v-app>
</template>

<script>
    import Sidebar from './components/SideBar'
    import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
      Sidebar, Footer
  },
  data () {
    return {
        buttons: [
            {
                name: '首頁',
                icon: 'home',
                to: '/'
            },
            {
                name: '排行榜',
                icon: 'assessment',
                to: '/leaderboards'
            },
            {
                name: '造型展示',
                icon: 'attach_money',
                to: '/weapons'
            },
            {
                name: '關於我們',
                icon: 'account_box',
                to: '/about'
            }
        ],
        nav: false,
    }
  },
    computed: {
        isMobile() {
            let mobile = this.$vuetify.breakpoint.mdAndDown;
            this.$store.dispatch('updateMobile', mobile);
            return mobile
        }
    },
    methods: {
        toTop: () => window.scrollTo(0, 0),
    }
}
</script>
