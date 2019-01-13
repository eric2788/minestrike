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
                sidebar: sidebar
            }
        }
    }
</script>

<style scoped>

</style>