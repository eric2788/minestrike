<template>
    <v-content>
        <v-container grid-list-md pa-0>
            <v-toolbar class="info darken-2 white--text" slot="header">
                <v-toolbar-title class="headline">造型展示</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn :href="contact_link" class="warning">聯絡服主以進行購買</v-btn>
            </v-toolbar>
            <v-card>
                <v-card-title>
                    <v-layout :class="{'wrap column': isMobile}">
                        <v-text-field append-icon="search" label="搜索" v-model="search"></v-text-field>
                        <v-select :class="{'pl-5': !isMobile}" :items="type_list" @change="selected_guns = '所有'"
                                  label="武器分類" v-model="selected_type"></v-select>
                        <v-select :class="{'pl-5': !isMobile}" :items="gun_list" label="槍械分類"
                                  v-model="selected_guns"></v-select>
                    </v-layout>
                </v-card-title>
                <v-card-text>
                    <v-progress-linear height="2" indeterminate v-if="loading"></v-progress-linear>
                    <v-data-iterator :content-class="(isMobile ? 'column' : 'row wrap')"
                                     :custom-filter="filteredItems"
                                     :items="weapons" :pagination.sync="pagination"
                                     :rows-per-page-items="rowsPerPageItems" :search="search"
                                     content-tag="v-layout" no-data-text="無可用數據" no-results-text="沒有找到匹配記錄"
                                     rows-per-page-text="每頁記錄數：">
                        <template slot="item" slot-scope="props">
                            <v-flex xs2>
                                <v-card :class="{'mt-3': isMobile}" @click="zoomWeapon(props.item)" hover>
                                    <div style="padding: 10px">

                                        <v-img :src="props.item.src" aspect-ratio="1" contain max-height="200px"
                                               position="center">
                                            <v-chip class="right" dark label small>{{props.item.gun}}</v-chip>
                                        </v-img>
                                    </div>
                                    <v-card-title :style="'color: '+props.item.color"
                                                  class="headline grey lighten-3 justify-center">
                                        <v-badge color="none" right>{{props.item.name}}<span slot="badge"
                                                                                             style="color: red"
                                                                                             v-if="props.item.hot">熱</span><span
                                                slot="badge" style="color: darkgoldenrod"
                                                v-else-if="props.item.new">新</span></v-badge>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-xs-center">
                                        <v-chip disabled outline text-color="black">{{props.item.price}}</v-chip>

                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </template>
                        <template slot="pageText" slot-scope="props">
                            正在列出 {{ props.pageStart }} - {{ props.pageStop }} 項, 總項目: {{ props.itemsLength }}
                        </template>
                    </v-data-iterator>
                </v-card-text>
            </v-card>
            <v-dialog max-width="500" v-model="dialog">
                <v-card class="justify-center">
                    <v-card-title class="headline info darken-3 white--text">{{dig.name}}</v-card-title>
                    <v-card-text>
                        <v-layout :class="isMobile ? 'column' : 'row wrap'">
                            <v-flex xs5>
                                <v-img :src="dig.src" contain max-height="200"></v-img>
                            </v-flex>
                            <v-flex xs7>
                                <span class="pr-1 grey--text text--darken-2">槍械:</span> <span class="subheading">{{dig.gun}}</span>
                                <br>
                                <span class="pr-1 grey--text text--darken-2">類型:</span> <span class="subheading">{{dig.type}}</span>
                                <br>
                                <span class="pr-1 grey--text text--darken-2">獲得方法:</span> <span class="subheading">{{dig.price}}</span>
                                <br>
                                <span class="pr-1 grey--text text--darken-2">敘述:</span>
                                <br>
                                <span class="body-2">
                                    {{dig.text}}
                                </span>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
</template>

<script>

    export default {
        name: "Weapons",
        data() {
            return {
                dialog: false,
                dig: {},
                loading: false,
                selected_type: '所有',
                selected_guns: '所有',
                search: '',
                contact_link: '',
                rowsPerPageItems: [6, 12, 24, {text: "All", value: -1}],
                pagination: {
                    rowsPerPage: 24,
                    descending: false,
                    sortBy: "name"
                },
                weapons: [],
                guns: [],
                types: []
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile;
            },
            gun_list() {
                let guns = this.guns;
                if (!guns.includes("所有")) guns.push("所有");
                return guns;
            },
            type_list() {
                let types = this.types;
                if (!types.includes("所有")) types.push("所有");
                return types;
            }
        },
        methods: {
            zoomWeapon(item) {
                this.dig = item;
                this.dialog = true;
            },
            filteredItems(items, search) {
                let result = items;
                if (this.selected_type !== '所有') result = items.filter(r => r.type === this.selected_type);
                if (this.selected_guns !== '所有') result = items.filter(r => r.gun === this.selected_guns);
                if (search.length > 0) result = items.filter(r => r.name.match(search) || r.gun.match(search) || r.type.match(search));
                return result;
            },
            async get_Weapons() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'weapon'
                }).then(res => {
                    this.weapons = res.data;
                }).catch().finally(() => this.loading = false)
            },
            async get_Categories() {
                this.$axios({
                    method: 'get',
                    url: 'weapon/category'
                }).then(res => {
                    this.guns = res.data.guns;
                    this.types = res.data.types;
                }).catch();
            }
        },
        mounted() {
            this.get_Weapons();
            this.get_Categories();
            this.pagination.rowsPerPage = this.isMobile ? 6 : 24
        },
        beforeCreate() {
            fetch("/json/weapons.json").then(r => r.json()).then(data => this.contact_link = data.contact_link);
        }
    }
</script>

<style scoped>

</style>