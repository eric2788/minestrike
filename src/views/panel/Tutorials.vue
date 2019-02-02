<template>
    <v-container>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                {{addnew ? '新增' : '修改'}}教學:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(tut.id)" v-for="(tut,i) in tutorials">
                            <v-list-tile-title>{{tut.title}} ({{tut.type}})</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新教學
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field :rules="rule" label="標題" v-model="input.title"></v-text-field>
                    <v-text-field :rules="rule" label="教學類型" v-model="input.type"></v-text-field>
                    <VueEditor v-model="input.content"></VueEditor>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !valid" :loading="loading"
                       @click="addnew ? create_Tutorial() : edit_Tutorial(input.id)" class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="delete_Tutorial(input.id)" class="error"
                       v-if="!addnew">刪除此教學
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
        name: "Tutorials",
        components: {
            VueEditor
        },
        data() {
            return {
                valid: false,
                rule: [v => !!v || '必填'],
                input: {
                    id: '',
                    type: '',
                    title: '',
                    content: ''
                },
                loading: false,
                operation: {
                    fail: false,
                    success: false,
                },
                addnew: false,
                tutorials: []
            }
        },
        methods: {
            select_box(id) {
                this.addnew = false;
                const tutorial = this.tutorials;
                this.input = tutorial.find(record => record.id === id);
            },
            addNew() {
                this.input = {};
                this.addnew = true
            },
            async get_Tutorials() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'tutorial'
                }).then(res => {
                    this.tutorials = res.data;
                    if (res.data.length === 0) this.addnew = true;
                    else this.input = res.data[0];
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err)
                }).finally(() => this.loading = false)
            },
            async create_Tutorial() {
                this.loading = true;
                delete this.input.id;
                this.$axios({
                    method: 'post',
                    url: 'tutorial',
                    data: this.input,
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.get_Tutorials();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async edit_Tutorial(id) {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'tutorial/' + id,
                    data: this.input,
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.get_Tutorials();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            },
            async delete_Tutorial(id) {
                if (!id) return;
                this.loading = true;
                this.$axios({
                    method: 'delete',
                    url: 'tutorial/' + id
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_Tutorials();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            }
        },
        mounted() {
            this.get_Tutorials();
        }
    }
</script>

<style scoped>

</style>