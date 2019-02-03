<template>
    <v-container>
        <v-card class="mb-3">
            <v-card-title class="info darken-3 white--text headline">
                {{ cards_addnew ? '新增' : '修改'}}贊助板塊:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(home.id,false)" v-for="(home,i) in cards">
                            <v-list-tile-title>{{home.title}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew(false)">
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
                <tui-editor :options="options" mode="wysiwyg" v-model="content"></tui-editor>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading" :loading="loading" @click="cards_addnew ? addCards() : editCards(id)"
                       class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="delCards(id)" class="error" v-if="!cards_addnew">
                    刪除此板塊
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                {{ vipers_addnew ? '新增' : '修改'}}人物:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(person.uuid,true)" v-for="(person,i) in vipers">
                            <v-list-tile-title>{{person.username}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew(true)">
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
                            <v-img :src="vipers_addnew ? src : uuidSkin" alt="找不到此UUID" contain
                                   lazy-src="https://crafatar.com/renders/body/8667ba71-b85a-4004-af54-457a9734eed7"
                                   max-height="300px"></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field :disabled="!vipers_addnew" :rules="rule" @click:append="headSkin(uuid)"
                                          append-icon="image_search" suffix="搜索皮膚: "
                                          counter="36" label="UUID" v-model="uuid"></v-text-field>
                            <v-text-field :rules="rule" label="用戶名" v-model="username"></v-text-field>
                            <v-text-field :rules="rule" label="顏色" v-model="color"></v-text-field>
                            <v-text-field :rules="rule" label="職位" v-model="rank"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !valid" :loading="loading"
                       @click="vipers_addnew ? createVIP() : editVIP(uuid)" class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="deleteVIP(uuid)" class="error"
                       v-if="!vipers_addnew">刪除此人物
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
    import TuiEditor from "@toast-ui/vue-editor/src/Editor";

    export default {
        name: "Donations",
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
                rule: [v => !!v || '必填'],
                src: '',
                loading: false,
                uuid: '',
                color: '',
                username: '',
                rank: '',
                cards_addnew: false,
                vipers_addnew: false,
                title: '',
                content: '',
                id: 0,
                valid: false,
                vipers: [],
                cards: [],
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
            async get_vipers() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'donation'
                }).then(res => {
                    this.vipers = res.data;
                    if (res.data.length === 0) this.vipers_addnew = true;
                    else {
                        this.uuid = res.data[0].uuid;
                        this.username = res.data[0].username;
                        this.rank = res.data[0].rank;
                        this.color = res.data[0].color;
                    }
                }).catch(() => {
                }).finally(() => this.loading = false)
            },
            select_box(id, viper) {
                if (!viper) {
                    this.cards_addnew = false;
                    const cards = this.cards;
                    let result = cards.find(record => record.id === id);
                    this.title = result.title;
                    this.content = result.html_content;
                    this.id = result.id
                } else {
                    this.vipers_addnew = false;
                    const vipers = this.vipers;
                    let result = vipers.find(record => record.uuid === id);
                    this.uuid = result.uuid;
                    this.username = result.username;
                    this.rank = result.rank;
                    this.color = result.color;
                }
            },
            addNew(viper) {
                if (viper) {
                    this.vipers_addnew = true;
                    this.$refs.form.reset();
                } else {
                    this.title = '';
                    this.content = '';
                    this.cards_addnew = true
                }
            },
            async createVIP() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: 'donation',
                    data: {
                        uuid: this.uuid,
                        color: this.color,
                        username: this.username,
                        rank: this.rank,
                    }
                }).then(res => {
                    if (res.data.uuid != null) {
                        this.operation.success = true;
                        this.get_vipers();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch((err) => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async editVIP(uuid) {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'donation/' + uuid,
                    data: {
                        color: this.color,
                        username: this.username,
                        rank: this.rank,
                    }
                }).then(res => {
                    if (res.data.uuid != null) {
                        this.operation.success = true;
                        this.get_vipers();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch((err) => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            async deleteVIP(uuid) {
                this.loading = true;
                this.$axios({
                    method: 'delete',
                    url: 'donation/' + uuid
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_vipers();
                    } else {
                        this.operation.success = false;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false)
            },
            editCards(id) {
                this.cards.map(card => {
                    if (card.id === id) {
                        card.title = this.title;
                        card.html_content = this.content;
                    }
                });
                this.saveCards();
            },
            addCards() {
                const id = () => {
                    let random = 0;
                    let i = 10;
                    while (true) {
                        random = Math.round(Math.random() * i);
                        const zero = this.cards.filter(data => data.id === random).length === 0;
                        if (zero) break;
                        else i += 5;
                    }
                    return random;
                };
                this.cards.push({
                    id: id(),
                    title: this.title,
                    html_content: this.content
                });
                this.saveCards();
            },
            delCards(id) {

                let index = -1;
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].id === id) index = i;
                }
                window.console.log(index);
                if (index > -1) {
                    this.cards.splice(index, 1);
                    this.saveCards();
                } else {
                    this.operation.fail = true;
                }
            },
            async saveCards() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: '//127.0.0.1/php/json.php',
                    data: {
                        json: 'donation',
                        content: this.cards
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.getCards();
                    } else {
                        window.console.log(res.data.error);
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            },
            getCards() {
                fetch("/json/donation.json").then(r => r.json()).then(data => {
                    this.cards = data.cards;
                    if (data.cards.length === 0) this.cards_addnew = true;
                    else {
                        this.title = data.cards[0].title;
                        this.content = data.cards[0].html_content;
                        this.id = data.cards[0].id;
                    }
                })
            }
        },
        mounted() {
            this.get_vipers();
            this.getCards();
            this.headSkin(this.uuid)
        }
    }
</script>

<style scoped>

</style>