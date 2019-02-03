<template>
    <v-content>
        <v-card v-if="!loading">
            <v-card-title class="info darken-3 white--text headline">{{Announce.title}}</v-card-title>
            <v-card-text>
                <tui-editor-viewer :value="Announce.content"></tui-editor-viewer>
            </v-card-text>
            <v-card-actions class="info darken-4 white--text">
                <v-spacer></v-spacer>
                <span class="subheading">發佈日期: {{Announce.date}}</span>
            </v-card-actions>
        </v-card>
        <v-progress-linear height="3" indeterminate v-else></v-progress-linear>
    </v-content>
</template>

<script>
    import TuiEditorViewer from "@toast-ui/vue-editor/src/Viewer";

    export default {
        name: "AnnounceArticle",
        components: {
            TuiEditorViewer
        },
        data() {
            return {
                Announce: {},
                loading: false,
            }
        },
        async mounted() {
            const id = this.$route.params.id;
            this.loading = true;
            this.$axios({
                method: 'get',
                url: 'announce'
            }).then(res => {
                const result = res.data.find(data => data.id.toString() === id);
                if (!result) this.$router.replace('/announce');
                else this.Announce = result;
            }).catch(err => {
                window.console.log(err);
                this.$router.replace('/announce');
            }).finally(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>