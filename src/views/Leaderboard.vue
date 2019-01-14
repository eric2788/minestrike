<template>
    <v-content>
        <v-toolbar class="info darken-2 white--text">
            <v-toolbar-title class="headline">積分排行</v-toolbar-title>
        </v-toolbar>
        <v-card class="elevation-2">
            <v-card-title>
                <v-layout :class="(isMobile ? 'wrap' : '')">
                    <v-btn :disabled="loading || countdown!==0" :loading="loading" @click="update_rank"
                           class="success mt-3">
                        {{countdown !== 0 ? '冷卻 '+countdown+'秒' : '刷新'}}
                    </v-btn>
                    <span class="subheading red--text pt-2 mt-3">最近刷新: {{!!last_update ? last_update : ' 加載失敗'}}</span>
                    <v-switch :class="{'pl-5': !isMobile}" :label="'切換到 '+(three_d ? '2' : '3')+'D 頭像'"
                              v-model="three_d"></v-switch>
                <v-spacer></v-spacer>
                    <v-text-field :style="!isMobile ? 'width:50px' : ''" append-icon="search" hide-details label="搜索"
                                  single-line v-model="search"></v-text-field>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="Array.from(rank_leader_local)" :loading="loading"
                              :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems" class="elevation-1"
                              rows-per-page-text="每頁記錄數："
                              no-results-text="沒有找到匹配記錄" no-data-text="無可用數據" :search="search">
            <v-progress-linear height="4px" slot="progress" color="black" indeterminate></v-progress-linear>
            <template  slot="items" slot-scope="props">
                <td style="padding: 10px"><v-img alt="Loading..." :src="headskin(props.item.uuid,three_d)" width="50px"></v-img></td>
                <td>{{ props.item.player_name }}</td>
                <td>{{ props.item.rank }}</td>
                <td>{{ props.item.fame }}</td>
                <td>{{ props.item.kills }}</td>
                <td>{{ props.item.deaths }}</td>
                <td>{{ props.item.kdr }}</td>
                <td>{{ props.item.duration }}</td>
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
        name: "Leaderboard",
        data(){
            return {
                three_d: false,
                rowsPerPageItems: [
                    20,50,70,
                    {"text":"All","value":-1}
                ],
                last_update: '',
                update_fail: false,
                update_success: false,
                loading: false,
                search: '',
                headers: [
                    {sortable: false},
                    {text: '玩家名稱', value: 'player_name'},
                    {text: '所屬牌位',value: 'fame'},
                    {text: '牌位積分',value: 'fame'},
                    {text: '殺敵數', value: 'kills'},
                    {text: '死亡數', value: 'deaths'},
                    {text: '殺敵/死亡比例', value: 'kdr'},
                    {text: '遊玩時數', value: 'seconds'}
                  ],
                pagination: {
                    sortBy: "fame",
                    descending: true,
                    rowsPerPage: 20
                },
                rank_leader_local: [],
                countdown: 0,
            }
        },
        computed: {
            isMobile(){
                return this.$store.state.isMobile;
            }
        },
        methods: {
            async get_rank_local() {
                this.$axios.get("//test.hypernite.com/minestrike/php/api.php?data=list").then(res => {
                    this.rank_leader_local = res.data;
                    this.last_update = new Date().toLocaleTimeString();
                    this.loading = false;
                    return true;
                }).catch(() => {
                    this.update_fail = true;
                    this.loading = false;
                    return false;
                });
            },
            async get_rank(){
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: '/list'
                }).then(res=>{
                    this.rank_leader_local = res.data;
                    this.last_update = new Date().toLocaleTimeString();
                    this.loading = false;
                    return true;
                }).catch(()=> {
                    return this.get_rank_local();
                });
            },
            async update_rank_local() {
                this.$axios.get('//test.hypernite.com/minestrike/php/api.php?data=refresh').then(res => {
                    if (res.data.success && this.get_rank_local()) {
                        this.update_success = true;
                        this.cooldown(30);
                        return true;
                    }
                }).catch(() => {
                    this.update_fail = true;
                    this.loading = false;
                    return false;
                });
            },
            async update_rank(){
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: '/refresh'
                }).then(res=>{
                    if (res.data.success && this.get_rank()) {
                        this.update_success = true;
                        this.cooldown(30);
                    }else{
                        this.update_fail = true;
                        this.loading = false;
                    }
                }).catch(()=> {
                    this.update_rank_local()
                });
            },
            headskin(uuid,three_d){
                return (three_d ? 'https://crafatar.com/renders/head/': 'https://crafatar.com/avatars/')+uuid.toString()+(three_d ? '?scale=10' : '')
            },
            cooldown(count){
                this.countdown = count;
                let cool = setInterval(()=>{
                    if (this.countdown > 0) this.countdown--;
                    else clearInterval(cool)
                },1000)
            }
        },
        created() {
            this.get_rank();
            let cooldown = this.$store.state.cooldown;
            if (cooldown > 0) this.cooldown(cooldown);
        },
        mounted() {
            this.three_d = this.$store.state.avatar_3d
        },
        beforeDestroy(){
            this.$store.commit('setCooldown', this.countdown);
            this.$store.commit('set3D', this.three_d);
        }
    }
</script>

<style scoped>

</style>