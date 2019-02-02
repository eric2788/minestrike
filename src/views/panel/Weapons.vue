<template>
    <v-container>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                {{addnew ? '新增' : '修改'}}造型
                <v-spacer></v-spacer>
                <v-menu left max-height="600" offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(wea.id)" v-for="(wea,i) in weapons">
                            <v-list-tile-title>{{wea.name}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新造型
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-layout :class="isMobile ? 'column' : 'row wrap'">
                        <v-flex xs4>
                            <v-img :src="addnew ? src : input.src" contain
                                   lazy-src="https://cdn.shopify.com/s/files/1/1285/0147/products/sign2-032a_1024x1024.png?v=1527227219"
                                   max-height="300">

                            </v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field :rules="rule" label="槍械" v-model="input.gun"></v-text-field>
                            <v-text-field :rules="rule" label="槍械類型" v-model="input.type"></v-text-field>
                            <v-text-field :rules="rule" label="造型名稱" v-model="input.name"></v-text-field>
                            <v-text-field :rules="rule" label="獲得方法" v-model="input.price"></v-text-field>
                            <v-text-field :rules="rule" @click:append="getSkin(input.src)" append-icon="image_search"
                                          label="圖片連結" v-model="input.src"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout column>
                        <v-text-field :color="input.color ? input.color : 'none'" :rules="rule" label="文字顏色"
                                      placeholder="必須符合css的顏色名稱要求" v-model="input.color"></v-text-field>
                        <v-textarea :rules="rule" label="造型介紹" outline v-model="input.text"></v-textarea>
                        <v-checkbox label="新武器" v-model="input.new"></v-checkbox>
                        <v-checkbox label="人氣武器 (人氣武器標籤將覆蓋新武器標籤。)" v-model="input.hot"></v-checkbox>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="loading || !valid" :loading="loading"
                       @click="addnew ? createWeapon() : editWeapon(input.id)" class="success">儲存
                </v-btn>
                <v-btn :disabled="loading || !valid" :loading="loading" @click="delWeapon(input.id)" class="error"
                       v-if="!addnew">刪除此造型
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
        name: "Weapons",
        data() {
            return {
                rule: [v => !!v || '必填'],
                src: '',
                input: {
                    id: -1,
                    gun: '',
                    type: '',
                    src: '',
                    name: '',
                    color: '',
                    text: '',
                    price: '',
                    new: false,
                    hot: false,
                },
                addnew: false,
                valid: false,
                loading: false,
                operation: {
                    fail: false,
                    success: false,
                },
                weapons: [],
            }
        },
        methods: {
            getSkin(src) {
                this.src = src;
            },
            addNew() {
                this.addnew = true;
                this.src = 'https://cdn.shopify.com/s/files/1/1285/0147/products/sign2-032a_1024x1024.png?v=1527227219';
                this.input = {}
            },
            select_box(id) {
                this.addnew = false;
                const weapon = this.weapons;
                this.input = weapon.find(record => record.id === id);
            },
            async getWeapons() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'weapon'
                }).then(res => {
                    this.weapons = res.data;
                    if (res.data.length === 0) this.addnew = true;
                    else this.input = res.data[0];
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = false);
            },
            async createWeapon() {
                this.loading = true;
                delete this.input.id;
                this.$axios({
                    method: 'post',
                    url: 'weapon',
                    data: this.input
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.getWeapons();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true;
                }).finally(() => this.loading = true)
            },
            async editWeapon(id) {
                this.loading = true;
                this.$axios({
                    method: 'put',
                    url: 'weapon/' + id,
                    data: this.input
                }).then(res => {
                    if (res.data.id != null) {
                        this.operation.success = true;
                        this.getWeapons();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    this.operation.fail = true;
                    window.console.log(err);
                }).finally(() => this.loading = false);
            },
            async delWeapon(id) {
                this.loading = true;
                this.$axios({
                    method: 'delete',
                    url: 'weapon/' + id
                }).then(res => {
                    if (res.data.success) {
                        this.operation.success = true;
                        this.getWeapons();
                    } else {
                        this.operation.fail = true;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.operation.fail = true
                }).finally(() => this.loading = false)
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        },
        mounted() {
            this.getWeapons();
        }
    }
</script>

<style scoped>

</style>