<template>
    <v-content>
        <v-container pa-0>
            <v-card class="hide-overflow">
                <div class="fb-page" data-adapt-container-width="true" data-hide-cover="false"
                     data-href="https://www.facebook.com/MineStrike-2036379906680739/" data-show-facepile="true"
                     data-small-header="false">
                    <blockquote cite="https://www.facebook.com/MineStrike-2036379906680739/"
                                class="fb-xfbml-parse-ignore"><a
                            href="https://www.facebook.com/MineStrike-2036379906680739/">
                        <v-progress-linear color="primary" indeterminate></v-progress-linear>
                    </a></blockquote>
                </div>
            </v-card>
            <v-card :key="i" class="mt-3" v-for="(s,i) in sidebar">
                <v-card-title class="headline info darken-2 white--text">{{s.title}}</v-card-title>
                <v-card-text v-html="s.html_content"></v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    import sidebar from '../../public/json/sidebar'

    export default {
        name: "SideBar",
        data() {
            return {
                sidebar: []
            }
        },
        mounted: () => {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v2.12&appId=1193358790711987&autoLogAppEvents=1';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },
        beforeCreate() {
            fetch('./json/sidebar.json').then(r => r.json()).then(res => this.sidebar = res).catch(() => this.sidebar = sidebar);
        }
    }
</script>

<style scoped>

</style>