<template>
    <v-container>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                {{ addnew ? '新增' : '修改'}}公告:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(ann.id)" v-for="(ann,i) in announce">
                            <v-list-tile-title>{{ann.title}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新公告
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-text-field :rules="[v=>!!v || '必填']" label="標題" v-model="title"></v-text-field>
                <VueEditor v-model="content"></VueEditor>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !title" :loading="loading"
                       @click="addnew ? createAnnounce() : editAnnounce(id)"
                       class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="deleteAnnounce(id)" class="error" v-if="!addnew">
                    刪除此公告
                </v-btn>
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
    import {VueEditor} from 'vue2-editor'

    export default {
        name: "Announce",
        components: {
            VueEditor
        },
        data() {
            return {
                title: '',
                content: '',
                id: '',
                loading: false,
                addnew: false,
                announce: [],
                operation: {
                    fail: false,
                    success: false,
                }
            }
        },
        computed: {},
        methods: {
            async get_announce() {
                this.loading = true;
                this.$axios({
                    methods: 'get',
                    url: '/announce'
                }).then(res => {
                    this.announce = res.data;
                    if (res.data.length === 0) this.addnew = true;
                    else {
                        this.title = res.data[0].title;
                        this.content = res.data[0].content;
                        this.id = res.data[0].id;
                    }
                }).catch((err) => window.console.log(err)).finally(() => this.loading = false)
            },
            select_box(id) {
                this.addnew = false;
                const announce = this.announce;
                let result = announce.find(record => record.id === id);
                this.title = result.title;
                this.content = result.content;
                this.id = result.id;
            },
            addNew() {
                this.title = '';
                this.content = '';
                delete this.id;
                this.addnew = true
            },
            async createAnnounce() {
                delete this.id;
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: 'announce',
                    data: {
                        title: this.title,
                        content: this.content
                    }
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.get_announce();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async editAnnounce(id) {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'announce/' + id,
                    data: {
                        title: this.title,
                        content: this.content,
                    }
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.get_announce();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async deleteAnnounce(id) {
                if (!this.id) return;
                this.loading = true;
                this.$axios({
                    method: 'delete',
                    url: 'announce/' + id
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_announce();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch((err) => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false);
            }
        },
        mounted() {
            this.get_announce();
        }
    }
</script>

<style scoped>

</style>