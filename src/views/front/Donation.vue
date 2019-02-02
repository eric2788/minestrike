<template>
    <v-content>
        <v-container pa-0>
            <v-card :class="i!==0 ? 'mt-3' : ''" :key="i" v-for="(h,i) in cards">
                <v-card-title class="headline info darken-2 white--text">{{h.title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-html="h.html_content"></v-card-text>
            </v-card>
            <v-card :class="{'mt-3': cards.length > 0}">
                <v-card-title class="headline info darken-2 white--text">
                    {{title}}
                </v-card-title>
                <v-card-text>
                    <v-text-field append-icon="search" label="搜索 用戶名 或 VIP階級" v-model="search"></v-text-field>
                    <v-data-iterator :content-class="(isMobile ? 'column' : 'row wrap')" :items="vipers"
                                     :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems"
                                     :search="search" content-tag="v-layout" no-data-text="無"
                                     no-results-text="沒有找到匹配人物" rows-per-page-text="每頁記錄數：">
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
                                        <v-chip :text-color="props.item.color" dark label outline>{{props.item.rank}}
                                        </v-chip>
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
        name: "Donation",
        data() {
            return {
                search: '',
                rowsPerPageItems: [12, 24, 50, {text: "All", value: -1}],
                pagination: {
                    rowsPerPage: 12,
                    sortBy: "priority",
                },
                title: '',
                cards: [],
                vipers: [],
                loading: false,
            }
        },
        methods: {
            async get_vipers() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'donation'
                }).then(res => this.vipers = res.data).catch().finally(() => this.loading = false)
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        },
        mounted() {
            this.get_vipers();
        },
        beforeCreate() {
            fetch("/json/donation.json").then(r => r.json()).then(data => {
                this.title = data.vip_title;
                this.cards = data.cards;
            })
        }
    }
</script>

<style scoped>

</style>