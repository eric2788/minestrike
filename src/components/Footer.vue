<template>
    <v-footer class="elevation-2 mt-5" height="auto">
        <v-card class="info darken-4 flex" raised tile>
            <v-card-title class="white--text pt-4 pb-4">
                <template v-if="!isMobile">
                    <h2 class="pr-2 headline">MineStrike 伺服器</h2>
                    <span class="subheading"> - 槍械競技｜穩定更新｜競技活動｜軍火造型｜平衡遊玩</span>
                </template>
                <v-spacer></v-spacer>
                <!-- Not work on production mode -->
                <!--v-btn :style="isMobile ? 'width: 100%' : ''" :class="{'flex v-btn--block': isMobile}" :href="link.link" :key="i" color="white" flat round
                       v-for="(link,i) in links">
                    <v-icon class="pr-2">{{link.icon}}</v-icon>
                    {{ link.name }}
                </v-btn-->
                <div :class="{'flex': isMobile}">
                    <v-btn :fab="isMobile" :href="link.link" :key="i" color="white" flat round
                           v-for="(link,i) in links">
                        <v-icon :class="{'pr-2': !isMobile}">{{link.icon}}</v-icon>
                        <span v-if="!isMobile">{{link.name}}</span>
                    </v-btn>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="info darken-3">
                <v-flex text-xs-center white--text xs12>
                    &copy;2019 — MineStrike 官方網站, <br v-if="isMobile"> 網站由 <strong><a href="//github.com/eric2788"
                                                                                      style="color:white">Eric
                    Lam</a></strong> 創建, 版權所有。
                </v-flex>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    import social from '../../public/json/social_icon'

    export default {
        name: "Footer",
        data() {
            return {
                links: social
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        }
    }
</script>

<style scoped>

</style>