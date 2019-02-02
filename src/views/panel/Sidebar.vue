<template>
    <v-container>
        <v-card class="mb-3">
            <v-card-title class="info darken-3 white--text headline">
                {{ addnew ? '新增' : '修改'}}右側欄板塊:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(side.id)" v-for="(side,i) in sidebars">
                            <v-list-tile-title>{{side.title}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew()">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新板塊
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-text-field label="標題" v-model="title"></v-text-field>
                <VueEditor v-model="content"></VueEditor>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading" :loading="loading" @click="addnew ? add_sidebars() : edit_sidebars(id)"
                       class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="del_sidebars(id)" class="error" v-if="!addnew">
                    刪除此板塊
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
        name: "SideBar",
        components: {
            VueEditor
        },
        data() {
            return {
                rule: [v => !!v || '必填'],
                loading: false,
                addnew: false,
                title: '',
                content: '',
                id: 0,
                sidebars: [],
                operation: {
                    fail: false,
                    success: false,
                }
            }
        },
        computed: {
            uuidSkin() {
                const uuid = this.uuid;
                if (!uuid) return '';
                else return 'https://crafatar.com/renders/body/' + uuid;
            }
        },
        methods: {
            headSkin(uuid) {
                this.src = !uuid ? 'https://crafatar.com/renders/body/8667ba71-b85a-4004-af54-457a9734eed7' : "https://crafatar.com/renders/body/" + uuid
            },
            select_box(id) {
                this.addnew = false;
                const sidebars = this.sidebars;
                let result = sidebars.find(record => record.id === id);
                this.title = result.title;
                this.content = result.html_content;
                this.id = result.id
            },
            addNew() {
                this.title = '';
                this.content = '';
                this.addnew = true
            },
            edit_sidebars(id) {
                this.sidebars.map(card => {
                    if (card.id === id) {
                        card.title = this.title;
                        card.html_content = this.content;
                    }
                });
                this.save_sidebars();
            },
            add_sidebars() {
                const id = () => {
                    let random = 0;
                    let i = 10;
                    while (true) {
                        random = Math.round(Math.random() * i);
                        const zero = this.sidebars.filter(data => data.id === random).length === 0;
                        if (zero) break;
                        else i += 5;
                    }
                    return random;
                };
                this.sidebars.push({
                    id: id(),
                    title: this.title,
                    html_content: this.content
                });
                this.save_sidebars();
            },
            del_sidebars(id) {

                let index = -1;
                for (let i = 0; i < this.sidebars.length; i++) {
                    if (this.sidebars[i].id === id) index = i;
                }
                window.console.log(index);
                if (index > -1) {
                    this.sidebars.splice(index, 1);
                    this.save_sidebars();
                } else {
                    this.operation.fail = true;
                }
            },
            async save_sidebars() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: '/php/sidebars.php',
                    data: this.sidebars
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_sidebars();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            },
            get_sidebars() {
                fetch("/json/sidebar.json").then(r => r.json()).then(data => {
                    this.sidebars = data;
                    if (data.length === 0) this.addnew = true;
                    else {
                        this.title = data[0].title;
                        this.content = data[0].html_content;
                        this.id = data[0].id;
                    }
                })
            }
        },
        mounted() {
            this.get_sidebars();
        }
    }
</script>

<style scoped>

</style>