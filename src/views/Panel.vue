<template>
    <v-app>
        <v-navigation-drawer :permanent="!isMobile" app fixed v-model="nav">
            <v-card class="grey lighten-3" flat>
                <v-card-title class="headline">
                    編輯選項
                </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-list>
                <v-list-tile :key="i" @click="name = btn.route" v-for="(btn,i) in buttons">
                    <v-list-tile-action>
                        <v-icon>{{btn.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        {{btn.name}}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app class="info darken-4 white--text" dark fixed>
            <v-toolbar-side-icon @click="nav = !nav" v-if="isMobile"></v-toolbar-side-icon>
            <v-toolbar-title>MineStrike - 後台系統</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout" class="warning">登出</v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <router-view :name="name"></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Panel",
        data() {
            return {
                nav: false,
                name: 'home',
                buttons: [
                    {
                        name: '首頁',
                        route: 'home',
                        icon: ''
                    },
                    {
                        name: '公告',
                        route: 'announce',
                        icon: ''
                    },
                    {
                        name: '武器',
                        route: 'weapon',
                        icon: ''
                    },
                    {
                        name: '教學',
                        route: 'tutorial',
                        icon: ''
                    },
                    {
                        name: '贊助',
                        route: 'donate',
                        icon: ''
                    },
                    {
                        name: '關於',
                        route: 'about',
                        icon: ''
                    }
                ]
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped>

</style>