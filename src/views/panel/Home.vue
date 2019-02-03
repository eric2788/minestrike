<template>
    <v-container>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                修改首頁:
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
                <v-text-field :disabled="loading" label="標題" v-model="title"></v-text-field>
                <tui-editor :options="options" mode="wysiwyg" v-model="content"></tui-editor>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading" :loading="loading" @click="editHome" class="success">儲存</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar :timeout="3000" bottom v-model="operation.fail">操作失敗，請稍後再試。
            <v-btn @click="operation.fail = false" color="error" flat>返回</v-btn>
        </v-snackbar>
        <v-snackbar :timeout="3000" bottom v-model="operation.success">操作成功。
            <v-btn @click="operation.success = false" color="success" flat>OK</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import TuiEditor from "@toast-ui/vue-editor/src/Editor";

    export default {
        name: "Home",
        components: {
            TuiEditor,
        },
        data() {
            return {
                options: {
                    useDefaultHTMLSanitizer: true,
                    language: 'en_US',
                    hideModeSwitch: true,
                    minHeight: '400px',
                },
                title: '',
                content: '',
                id: '',
                loading: false,
                home: {},
                operation: {
                    fail: false,
                    success: false,
                }
            }
        },
        methods: {
            async get_home() {
                this.loading = true;
                this.$axios({
                    methods: 'get',
                    url: 'home'
                }).then(res => {
                    this.home = res.data;
                    this.title = res.data.title;
                    this.content = res.data.content;
                }).catch((err) => window.console.log(err)).finally(() => this.loading = false)
            },
            async editHome() {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'home',
                    data: {
                        title: this.title,
                        content: this.content,
                    }
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.get_home();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
        },
        mounted() {
            this.get_home();
        }
    }
</script>

<style scoped>

</style>