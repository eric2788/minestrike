<template>
    <v-container>
        <v-card class="mb-3">
            <v-card-title class="info darken-3 white--text headline">
                {{ addnew ? '新增' : '修改'}}媒體連結:
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(side.id)" v-for="(side,i) in social_link">
                            <v-list-tile-title>{{side.name}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew()">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新連結
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-form lazy-validation v-model="valid">
                    <v-text-field :rules="rule" label="媒體名稱" v-model="name"></v-text-field>
                    <v-text-field :rules="link_rules" label="媒體連結" v-model="link"></v-text-field>
                    <v-text-field :append-icon="icon" :rules="rule" label="Icon 標誌"
                                  placeholder="你可到 https://material.io/tools/icons/ 尋找Icon 標誌。" suffix="Icon 預覽: "
                                  v-model="icon"></v-text-field>
                </v-form>

            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !valid" :loading="loading"
                       @click="addnew ? add_social_link() : edit_social_link(id)"
                       class="success">儲存
                </v-btn>
                <v-btn :disabled="loading" :loading="loading" @click="del_social_link(id)" class="error" v-if="!addnew">
                    刪除此連結
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="mb-3">
            <v-card-title class="info darken-3 headline white--text">
                修改底部文字
            </v-card-title>
            <v-card-text>
                <v-text-field label="修改底部標題" v-model="footer_title"></v-text-field>
                <v-text-field label="修改底部副標題" v-model="footer_subtitle"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading" :loading="loading" @click="save_footer()" class="success">儲存</v-btn>
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
        name: "SocialFooter",
        data() {
            return {
                valid: false,
                link_rules: [v => !!v || '必填', v => v.toString().includes('https://') || '必須為Https連結！'],
                rule: [v => !!v || '必填'],
                loading: false,
                addnew: false,
                name: '',
                link: '',
                icon: '',
                footer_title: '',
                footer_subtitle: '',
                id: 0,
                social_link: [],
                footer: {},
                operation: {
                    fail: false,
                    success: false,
                },
                test_footer: {},
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
                const social_link = this.social_link;
                let result = social_link.find(record => record.id === id);
                this.name = result.name;
                this.link = result.link;
                this.id = result.id;
                this.icon = result.icon;
            },
            addNew() {
                this.name = '';
                this.link = '';
                this.icon = '';
                this.addnew = true
            },
            edit_social_link(id) {
                this.social_link.map(card => {
                    if (card.id === id) {
                        card.name = this.name;
                        card.link = this.link;
                        card.icon = this.icon;
                    }
                });
                this.save_social_link();
            },
            add_social_link() {
                const id = () => {
                    let random = 0;
                    let i = 10;
                    while (true) {
                        random = Math.round(Math.random() * i);
                        const zero = this.social_link.filter(data => data.id === random).length === 0;
                        if (zero) break;
                        else i += 5;
                    }
                    return random;
                };
                this.social_link.push({
                    id: id(),
                    name: this.name,
                    link: this.link,
                    icon: this.icon,
                });
                this.save_social_link();
            },
            del_social_link(id) {

                let index = -1;
                for (let i = 0; i < this.social_link.length; i++) {
                    if (this.social_link[i].id === id) index = i;
                }
                window.console.log(index);
                if (index > -1) {
                    this.social_link.splice(index, 1);
                    this.save_social_link();
                } else {
                    this.operation.fail = true;
                }
            },
            async save_social_link() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: '//127.0.0.1/php/json.php',
                    data: {
                        json: 'social_icon',
                        content: this.social_link
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_social_link();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            },
            get_social_link() {
                fetch("/json/social_icon.json").then(r => r.json()).then(data => {
                    this.social_link = data;
                    if (data.length === 0) this.addnew = true;
                    else {
                        this.name = data[0].name;
                        this.link = data[0].link;
                        this.id = data[0].id;
                        this.icon = data[0].icon;
                    }
                })
            },
            get_footer() {
                fetch("/json/footer.json").then(r => r.json()).then(data => {
                    this.footer_title = data.title;
                    this.footer_subtitle = data.subheading;
                })
            },
            async save_footer() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: '//127.0.0.1/php/json.php',
                    data: {
                        json: 'footer',
                        content: {
                            title: this.footer_title,
                            subheading: this.footer_subtitle
                        }
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.get_footer();
                    } else {
                        window.console.log(res.data.error);
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false)
            }
        },
        mounted() {
            this.get_social_link();
            this.get_footer();
        }
    }
</script>

<style scoped>

</style>