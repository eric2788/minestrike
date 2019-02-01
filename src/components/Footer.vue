<template>
    <v-footer class="elevation-2 mt-5" height="auto">
        <v-card class="info darken-4 flex" raised tile>
            <v-card-title class="white--text pt-4 pb-4">
                <template v-if="!isMobile">
                    <h2 class="pr-2 headline">{{footer.title}}</h2>
                    <span class="subheading">{{footer.subheading}}</span>
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
                    &copy;2019 — MineStrike 官方網站<br v-if="isMobile"><span v-else>,</span> 網站由 <strong><a
                        href="//github.com/eric2788">Eric
                    Lam</a></strong> 創建, 版權所有。
                    <v-btn class="success mt-0 mb-0" href="//www.ownmc.space" small>網站製作委託</v-btn>
                </v-flex>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            },
        },
        data() {
            return {
                footer: {},
                links: []
            }
        },
        beforeCreate() {
            fetch("/json/footer.json").then(r => r.json()).then(data => this.footer = data);
            fetch("/json/social_icon.json").then(r => r.json()).then(data => this.links = data);
        }
    }
</script>

<style scoped>
    a, a:hover, a:active {
        color: white;
        text-decoration: none;
    }
</style>