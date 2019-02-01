<template>
    <v-app>
        <v-toolbar class="info darken-4 white--text">
            <v-toolbar-title class="headline">MineStrike - 後台登入</v-toolbar-title>
        </v-toolbar>
        <v-container pa-5>
            <v-card :style="isMobile ? {} : style">
                <v-alert :value="fail" type="error">登入失敗: 錯誤密碼。</v-alert>
                <v-alert :value="exception" type="warning">與登入系統連接出現異常，請稍後再試。</v-alert>
                <v-card-title class="info darken-2 white--text headline">登入管理員</v-card-title>
                <v-card-text>
                    <v-form lazy-validation v-model="valid">
                        <v-text-field :rules="rules" label="用戶名" type="text" v-model="username"></v-text-field>
                        <v-text-field :rules="rules" label="密碼" type="password" v-model="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="loading || !valid" :loading="loading" @click="Login" class="success">登入</v-btn>
                    <v-checkbox label="記住我" v-model="remember"></v-checkbox>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                valid: false,
                rules: [v => !!v || '必填'],
                loading: false,
                fail: false,
                exception: false,
                style: {
                    'margin-left': '35%',
                    'margin-right': '35%',
                    'margin-top': '10%'
                },
                remember: false
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            },
            ...mapState({
                session: "session"
            }),
            ...mapMutations(["setLogin"])
        },
        methods: {
            async Login() {
                this.loading = true;
                this.$axios({
                    method: 'post',
                    url: 'auth',
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).then(res => {
                    if (res.data.success) {
                        const uuid = res.data.session;
                        this.$store.dispatch('setSession', {
                            uuid: uuid,
                            remember: this.remember
                        });
                    } else {
                        this.fail = true
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.exception = true
                }).then(() => this.loading = false)
            }
        },
        created() {
            this.$store.dispatch('loadSession').then(() => {
                if (!this.session) return;
                this.$axios({
                    method: 'post',
                    url: 'auth/check?valid=' + this.session
                }).then(res => {
                    if (res.data.success) {
                        this.setLogin(true);
                        this.$router.push('/admin')
                    }
                }).catch(() => {
                });
            });

        }
    }
</script>

<style scoped>

</style>