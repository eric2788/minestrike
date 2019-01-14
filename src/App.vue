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
                              prepend-icon="contact_support"
                      >

                          <v-list-tile slot="activator">
                              <v-list-tile-title>教學幫助</v-list-tile-title>
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
            <v-menu :key="i+'menu'" open-on-hover origin="center center" transition="slide-y-transition"
                    v-else-if="!isMobile">
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
                name: '教學幫助',
                icon: 'contact_support',
                to: '/tutorials'
            },
            {
                name: '關於我們',
                icon: 'account_box',
                to: '/about'
            },
            {
                name: '贊助我們',
                icon: 'attach_money',
                to: '/donate'
            },
        ],
        nav: false,
    }
  },
    computed: {
        tutorial() {
            return this.$store.state.tutorial_json
        },
        isMobile() {
            let mobile = this.$vuetify.breakpoint.mdAndDown;
            this.$store.dispatch('updateMobile', mobile);
            return mobile
        },
        tutorial_type() {
            let result = [];
            Array.from(this.tutorial).forEach(item => result.push(item.name));
            return result;
        }
    },
    methods: {
        toTop: () => window.scrollTo(0, 0),
    },
    beforeCreate() {
        const tutorial_json = () => import('../public/json/tutorials.json');
        const weapons_json = () => import('../public/json/weapons.json');
        const staff_json = () => import('../public/json/staff.json');
        const social_json = () => import('../public/json/social_icon.json');
        const sidebar_json = () => import('../public/json/sidebar.json');
        const home_json = () => import('../public/json/home.json');
        const footer_json = () => import('../public/json/footer.json');
        const donation_json = () => import('../public/json/donation.json');


        /*const jsons = {
            tutorial: "tutorials",
            weapons: "weapons",
            home: "home",
            donation: "donation",
            staff: "staff",
            sidebar: "sidebar",
            social: "social_icon",
            footer: "footer"
        };

        const getJSON = (json)=>{
            fetch('./json/'+json+'.json').then(r => r.json()).then(data => {
                return data;
            }).catch(() => {
                return import('../public/json/'+json+'.json');
            });
        };

        let tutorial = getJSON(jsons.tutorial);
        let weapons = getJSON(jsons.weapons);
        let home = getJSON(jsons.home);
        let donation = getJSON(jsons.donation);
        let staff = getJSON(jsons.staff);
        let sidebar = getJSON(jsons.sidebar);
        let footer = getJSON(jsons.footer);
        let social = getJSON(jsons.social);

        this.$store.commit('setJSON', {tutorial,weapons,home,donation,staff,sidebar,footer,social});*/ // Totally Not Working


        fetch('./json/tutorials.json').then(r => r.json()).then(res => {
            this.$store.commit('setTutorial', res);
            this.$store.commit('setTutType', res[0].name);
        }).catch(() => this.$store.commit('setTutorial', tutorial_json()));

        fetch('./json/weapons.json').then(r => r.json()).then(res => this.$store.commit('setWeapons', res)).catch(() => this.$store.commit('setWeapons', weapons_json()));

        fetch('./json/home.json').then(r => r.json()).then(res => this.$store.commit('setHome', res)).catch(() => this.$store.commit('setHome', home_json()));

        fetch('./json/donation.json').then(r => r.json()).then(res => this.$store.commit('setDonation', res)).catch(() => this.$store.commit('setDonation', donation_json()));

        fetch('./json/staff.json').then(r => r.json()).then(res => this.$store.commit('setStaff', res)).catch(() => this.$store.commit('setStaff', staff_json()));

        fetch('./json/sidebar.json').then(r => r.json()).then(res => this.$store.commit('setSideBar', res)).catch(() => this.$store.commit('setSideBar', sidebar_json()));

        fetch('./json/social_icon.json').then(r => r.json()).then(res => this.$store.commit('setSocial', res)).catch(() => this.$store.commit('setSocial', social_json()));

        fetch('./json/footer.json').then(r => r.json()).then(res => this.$store.commit('setFooter', res)).catch(() => this.$store.commit('setFooter', footer_json()));


    }
}
</script>
