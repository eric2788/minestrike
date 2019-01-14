<template>
    <v-content>
        <v-toolbar class="info darken-2 white--text">
            <v-toolbar-title class="headline">{{!ip ? '用戶名 ' : 'IP '}}封禁列表</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-2">
            <v-card-title>
                <v-layout :class="(isMobile ? 'wrap' : '')">
                    <v-btn :disabled="loading" :loading="loading"
                           @click="get_ban(ip) ? update_success = true : update_fail = true" class="success mt-4">
                        刷新
                    </v-btn>
                    <v-radio-group :class="{'pl-5': !isMobile}" @change="get_ban(ip)" v-model="ip">
                        <v-radio :value="false" label="用戶名封禁"></v-radio>
                        <v-radio :value="true" label="IP封禁"></v-radio>
                    </v-radio-group>
                    <v-spacer></v-spacer>
                    <v-text-field :style="!isMobile ? 'width:50px' : ''" @change="()=>window.alert('do something')"
                                  append-icon="search" hide-details
                                  label="搜索" single-line v-model="search"></v-text-field>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="Array.from(ban_list_local)" :loading="loading"
                              :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems" :search="search"
                              class="elevation-1"
                              no-data-text="無可用數據" no-results-text="沒有找到匹配記錄" rows-per-page-text="每頁記錄數：">
                    <v-progress-linear color="black" height="4px" indeterminate slot="progress"></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.using_name ? props.item.target : hideIP(props.item.target) }}</td>
                        <td>{{ props.item.reason }}</td>
                        <td>{{ props.item.source }}</td>
                        <td>{{ props.item.created.toLocaleDateString() }}</td>
                        <td>{{ props.item.expire.toLocaleDateString() }}</td>
                        <td>{{ props.item.active ? '是' : '否' }}</td>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-snackbar :timeout="5000" top v-model="update_success">更新成功
            <v-btn @click="update_success = false" color="green" flat>返回</v-btn>
        </v-snackbar>
        <v-snackbar :timeout="5000" top v-model="update_fail">更新失敗，請稍候再嘗試
            <v-btn @click="update_fail = false" color="red" flat>返回</v-btn>
        </v-snackbar>
    </v-content>
</template>

<script>
    export default {
        name: "BanRecords",
        data() {
            return {
                rowsPerPageItems: [
                    20, 50, 70,
                    {"text": "All", "value": -1}
                ],
                update_fail: false,
                update_success: false,
                loading: false,
                search: '',
                headers: [
                    {text: '玩家名稱 / IP', value: 'target'},
                    {text: '封禁原因', value: 'reason', sortable: false},
                    {text: '操作者', value: 'source'},
                    {text: '封禁日期', value: 'created'},
                    {text: '解封日期', value: 'expire'},
                    {text: '封禁中', value: 'active', sortable: false},
                ],
                pagination: {
                    sortBy: "created",
                    descending: true,
                    rowsPerPage: 20
                },
                ban_list_local: [],
                ip: false,
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile;
            }
        },
        methods: {
            async get_ban_local(ip) {
                let data = ip ? 'baniplist' : 'banlist';
                this.$axios.get("//test.hypernite.com/minestrike/php/api.php?data=" + data).then(res => {
                    this.ban_list_local = res.data;
                    this.loading = false;
                    return true;
                }).catch(() => {
                    this.update_fail = true;
                    this.loading = false;
                    return false;
                });
            },
            async get_ban(ip) {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: ip ? '/baniplist' : '/banlist'
                }).then(res => {
                    this.ban_list_local = res.data;
                    this.loading = false;
                    return true;
                }).catch(() => {
                    return this.get_ban_local();
                });
            },
            hideIP(ip) {
                let ipnodes = ip.toString().split(".");
                ipnodes[3] = ipnodes[2] = '*';
                return ipnodes.join(".")
            }
        },
        created() {
            this.ip = this.$store.state.ban_ip;
            this.get_ban(this.ip);
        },
        beforeDestroy() {
            this.$store.commit('setIP', this.ip);
        }
    }
</script>

<style scoped>

</style>