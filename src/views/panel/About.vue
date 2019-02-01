<template>
    <v-container>
        <v-alert :value="true" dismissible type="info">在右邊的按鈕中，選擇你欲修改的人物標題進行編輯。</v-alert>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                {{ addnew ? '新增' : '修改'}}人物:
                <v-spacer></v-spacer>
                <v-menu left offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(person.uuid)" v-for="(person,i) in about">
                            <v-list-tile-title>{{person.name}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新人物
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-layout :class="this.$vuetify.breakpoint.mdAndDown ? 'column' : 'row wrap'">
                        <v-flex xs4>
                            <v-img :src="src" alt="找不到此UUID" contain
                                   lazy-src="https://crafatar.com/renders/body/8667ba71-b85a-4004-af54-457a9734eed7"
                                   max-height="300px"></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field :disabled="!addnew" :rules="rule" @click:append="headSkin(uuid)"
                                          append-icon="image_search" counter="36" label="UUID"
                                          v-model="uuid"></v-text-field>
                            <v-text-field :loading="name_loading" :rules="rule" @click:append="getName(uuid)"
                                          append-icon="autorenew" label="用戶名" v-model="username"></v-text-field>
                            <v-text-field :rules="rule" label="職位" v-model="position"></v-text-field>
                            <v-text-field :rules="rule" label="聯絡連結" v-model="contact"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !valid" :loading="loading"
                       @click="addnew ? create_about : edit_about(uuid)" class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="delete_about(uuid)" class="error" v-if="!addnew">
                    刪除此人物
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
    export default {
        name: "About",
        components: {},
        data() {
            return {
                src: '',
                valid: false,
                rule: [v => !!v || '必填'],
                uuid: '',
                username: '',
                position: '',
                contact: '',
                addnew: false,
                loading: false,
                name_loading: false,
                about: [],
                operation: {
                    fail: false,
                    success: false,
                }
            }
        },
        computed: {},
        methods: {
            select_box(uuid) {
                this.addnew = false;
                const person = this.about;
                let result = person.find(record => record.uuid === uuid);
                this.username = result.name;
                this.uuid = result.uuid;
                this.position = result.position;
                this.contact = result.contact_link;
            },
            addNew() {
                this.$refs.form.reset();
                this.addnew = true;
            },
            async create_about() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: 'about'
                }).then(res => {
                    if (res.data.uuid != null) {
                        this.operation.success = true;
                    } else {
                        this.operation.fail = true
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async edit_about(uuid) {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'about/' + uuid
                }).then(res => {
                    if (res.data.uuid != null) {
                        this.operation.success = true;
                    } else {
                        this.operation.fail = true
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async delete_about(uuid) {
                this.loading = true;
                this.$axios({
                    method: 'delete',
                    url: 'about/' + uuid
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                    } else {
                        this.operation.fail = true
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async getName() {
                const uuid = this.uuid.replace(new RegExp("-", "g"), "");
                this.name_loading = true;
                const link = 'https://api.mojang.com/user/profiles/' + uuid + '/names';
                window.console.log('Requesting: ' + link);
                this.$axios.get(link).then(res => {
                    window.alert(res.data);
                    this.username = res.data[0].name;
                    window.alert(res.data.length);
                }).catch(() => {
                    //ignore
                }).finally(() => this.name_loading = false);
            },
            async get_About() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'about',
                }).then(res => {
                    this.about = res.data;
                    if (res.data.length === 0) this.addnew = true;
                    else this.get_Default(res.data);
                }).catch((err) => window.console.log(err)).finally(() => this.loading = false)
            },
            get_Default(person) {
                this.username = person[0].name;
                this.uuid = person[0].uuid;
                this.position = person[0].position;
                this.contact = person[0].contact_link;
            },
            headSkin(uuid) {
                this.src = "https://crafatar.com/renders/body/" + uuid
            }
        },
        mounted() {
            this.get_About();
        }

    }
</script>

<style scoped>

</style>