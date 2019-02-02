<template>
    <v-app>
        <v-navigation-drawer :permanent="!isMobile" app class="elevation-2" fixed v-model="nav">
            <v-card class="primary darken-2" dark flat raised>
                <v-card-title class="headline">
                    編輯選項
                    <v-spacer></v-spacer>
                    <v-chip class="primary darken-4" label>
                        <v-icon dark>create</v-icon>
                    </v-chip>
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
                        icon: 'home'
                    },
                    {
                        name: '公告',
                        route: 'announce',
                        icon: 'announcement'
                    },
                    {
                        name: '造型',
                        route: 'weapon',
                        icon: 'extension'
                    },
                    {
                        name: '教學',
                        route: 'tutorial',
                        icon: 'contact_support'
                    },
                    {
                        name: '贊助',
                        route: 'donate',
                        icon: 'attach_money'
                    },
                    {
                        name: '關於',
                        route: 'about',
                        icon: 'account_box'
                    },
                    {
                        name: '右側欄',
                        route: 'sidebar',
                        icon: 'format_align_justify'
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