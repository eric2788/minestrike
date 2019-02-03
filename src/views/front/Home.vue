<template>
    <v-content>
        <v-container pa-0>
            <v-card v-if="!loading">
                <v-card-title class="headline info darken-2 white--text">{{title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <viewer :value="content"></viewer>
                </v-card-text>
            </v-card>
            <v-progress-linear height="3" indeterminate v-else></v-progress-linear>
        </v-container>
    </v-content>
</template>
<script>
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'highlight.js/styles/github.css';
    import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'
    export default {
        name: 'Home',
        components: {
            Viewer
        },
        data() {
            return {
                loading: false,
                title: '',
                content: ''
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile;
            }
        },
        methods: {
            async getHome() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'home'
                }).then(res => {
                    if (res.data.id != null) {
                        this.title = res.data.title;
                        this.content = res.data.content
                    } else {
                        this.title = '無此文章';
                        this.content = '無此文章內容'
                    }
                }).catch(() => {
                }).finally(() => this.loading = false)
            }
        },
        mounted() {
            this.getHome();
        }
    }
</script>
