<template>
    <v-content>
        <v-container grid-list-md pa-0>
            <v-toolbar class="info darken-2 white--text" slot="header">
                <v-toolbar-title class="headline">關於我們</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card>
                <v-card-title>
                    <v-text-field append-icon="search" label="搜索用戶名" v-model="search"></v-text-field>
                </v-card-title>
                <v-card-text>
                    <v-data-iterator :content-class="(isMobile ? 'column' : 'row wrap')" :items="staffs"
                                     :pagination.sync="pagination" :search="search" content-tag="v-layout"
                                     hide-actions no-data-text="無" no-results-text="沒有找到匹配人物">
                        <template slot="item" slot-scope="props">
                            <v-flex xs2>
                                <v-card :class="{'mt-3': isMobile}">
                                    <div style="padding: 10px">
                                        <v-img :src="'https://crafatar.com/renders/body/'+props.item.uuid"
                                               alt="Loading..." contain max-height="200px">
                                        </v-img>
                                    </div>
                                    <v-card-title class="headline grey lighten-3 justify-center">{{props.item.username}}
                                    </v-card-title>
                                    <v-card-text class="subheading text-xs-center">
                                        <v-chip dark outline text-color="black">{{props.item.position}}</v-chip>
                                        <br>
                                        <v-btn :href="props.item.contact" block class="primary">聯絡</v-btn>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </template>
                    </v-data-iterator>
                </v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "About",
        data() {
            return {
                search: '',
                pagination: {rowsPerPage: -1},
                loading: false,
                staffs: []
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            },
        },
        methods: {
            async get_Staffs() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'about'
                }).then(res => this.staffs = res.data).catch().finally(() => this.loading = false)
            }
        },
        mounted() {
            this.get_Staffs();
        }
    }
</script>

<style scoped>

</style>