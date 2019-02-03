<template>
    <v-app>
        <v-navigation-drawer fixed slide-x-transition temporary v-if="isMobile" v-model="nav">
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
                <v-list-tile :key="index" :to="button.to" @click.native="toTop()" v-for="(button,index) in buttons">
                        <v-list-tile-action>
                            <v-icon>{{button.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{button.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="info darken-4" dark flat>
            <v-toolbar-side-icon @click="nav = !nav" v-if="isMobile">
                <v-icon>menu</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title class="pr-2">MineStrike</v-toolbar-title>
            <template v-if="!isMobile">
                <v-btn :key="i" :to="btn.to" flat v-for="(btn,i) in buttons">{{btn.name}}</v-btn>
            </template>
            <v-spacer></v-spacer>
            <v-btn class="error" flat to="/admin">管理員後台</v-btn>
        </v-toolbar>
        <v-container grid-list-md>
            <v-fab-transition v-if="!isDestop">
                <v-btn :color="contain[size].color" @click="changeSize" absolute bottom
                       class="mb-5 elevation-10" fab fixed right>
                    <v-icon small>{{contain[size].icon}}</v-icon>
                </v-btn>
            </v-fab-transition>
            <v-layout :class="isMobile ? 'column' : 'row wrap'" justify-center>
                <v-flex :class="'xs'+contain[size].size+' '+(isDestop ? 'lg'+(contain[size].size+1) : '')">
                    <router-view name="main"></router-view>
                </v-flex>
                <v-flex :class="{'pt-3': isMobile}" :lg3="isDestop" xs2>
                    <Sidebar></Sidebar>
                </v-flex>
            </v-layout>
        </v-container>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import Sidebar from './../components/SideBar'
    import Footer from './../components/Footer'

    export default {
        name: 'FrontPage',
        components: {
            Sidebar, Footer
        },
        data() {
            return {
                size: 0,
                contain: [
                    {
                        size: 10,
                        icon: 'fas fa-arrow-left',
                        color: 'info'
                    },
                    {
                        size: 8,
                        icon: 'fas fa-arrow-right',
                        color: 'primary'
                    }
                ],
                buttons: [
                    {
                        name: '首頁',
                        icon: 'home',
                        to: '/'
                    },
                    {
                        name: '最新公告',
                        icon: 'announcement',
                        to: '/announce'
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
            isMobile() {
                return this.$store.state.isMobile
            },
            isDestop() {
                return this.$vuetify.breakpoint.lgAndDown;
            }
        },
        methods: {
            toTop: () => window.scrollTo(0, 0),
            changeSize() {
                this.size === this.contain.length - 1 ? this.size = 0 : this.size++;
                window.localStorage.setItem("ms_container_size", this.size + "");
            }
        },
        mounted() {
            let size = window.localStorage.getItem("ms_container_size");
            if (size != null) {
                this.size = Number.parseInt(size);
            }
        },
    }
</script>
<style scoped>
    *, *::before, *::after {
        transition: all .3s ease-in-out;
    }
</style>
