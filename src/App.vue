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
                  <v-list-tile :key="index" :to="button.to" @click.native="toTop()" v-if="button.to !== '/tutorials'">
                      <v-list-tile-action>
                          <v-icon>{{button.icon}}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{button.name}}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <template v-else>
                      <v-list-group
                              :key="index+'gp'"
                              prepend-icon="account_circle"
                              value="true"
                      >

                          <v-list-tile slot="activator">
                              <v-list-tile-title>Users</v-list-tile-title>
                          </v-list-tile>

                          <v-list-tile :key="i" @click="()=> {$store.commit('setTutType',item); nav = false}"
                                       to="/tutorials" v-for="(item,i) in tutorial_type">
                              <v-list-tile-action>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                  <v-list-tile-title><span class="black--text">{{item}}</span></v-list-tile-title>
                              </v-list-tile-content>

                          </v-list-tile>
                      </v-list-group>
                  </template>
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
            <v-btn :key="btn.icon" :to="btn.to" flat v-if="!isMobile && btn.to !== '/tutorials'">{{btn.name}}</v-btn>
            <v-menu :key="i+'menu'" offset-y v-else-if="!isMobile">
                <v-btn flat slot="activator">{{btn.name}}</v-btn>
                <v-list>
                    <v-list-tile :key="i" :to="btn.to" @click="$store.commit('setTutType',item)"
                                 v-for="(item,i) in tutorial_type">
                        <v-list-tile-title><span class="black--text">{{item}}</span></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
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
    import tutorials from '../public/json/tutorials'
export default {
  name: 'App',
  components: {
      Sidebar, Footer
  },
  data () {
    return {
        tutorial: tutorials,
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
                icon: 'extension',
                to: '/weapons'
            },
            {
                name: '封禁列表',
                icon: 'gavel',
                to: '/banlist'
            },
            {
                name: '贊助我們',
                icon: '',
                to: '/donate'
            },
            {
                name: '教學幫助',
                icon: 'contact_support',
                to: '/tutorials'
            },
            {
                name: '關於我們',
                icon: 'account_box',
                to: '/about'
            },
        ],
        nav: false,
    }
  },
    computed: {
        isMobile() {
            let mobile = this.$vuetify.breakpoint.mdAndDown;
            this.$store.dispatch('updateMobile', mobile);
            return mobile
        },
        tutorial_type() {
            let result = [];
            Array.from(this.tutorial).forEach(item => result.push(item.name))
            return result;
        }
    },
    methods: {
        toTop: () => window.scrollTo(0, 0),
    },
    created() {
        this.$store.commit('setTutType', this.tutorial[0].name)
    }
}
</script>
