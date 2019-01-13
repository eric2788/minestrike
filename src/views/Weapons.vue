<template>
    <v-content>
        <v-container grid-list-md pa-0>
            <v-toolbar class="info darken-2 white--text" slot="header">
                <v-toolbar-title class="headline">造型展示</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn :href="weapons.contact_link" class="warning">聯絡服主以進行購買</v-btn>
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
                    <v-data-iterator :content-class="(isMobile ? 'column' : 'row wrap')" :custom-filter="filteredItems"
                                     :items="weapons.boxes" :pagination.sync="pagination"
                                     :rows-per-page-items="rowsPerPageItems" :search="search"
                                     content-tag="v-layout" no-data-text="無可用數據" no-results-text="沒有找到匹配記錄"
                                     rows-per-page-text="每頁記錄數：">
                        <template slot="item" slot-scope="props">
                            <v-flex xs2>
                                <v-card :class="{'mt-3': isMobile}">
                                    <div style="padding: 10px">
                                        <v-img :src="props.item.img_src" aspect-ratio="1" contain max-height="200px"
                                               position="center"></v-img>
                                    </div>
                                    <v-card-title :style="'color: '+props.item.text_color"
                                                  class="headline grey lighten-3 justify-center">
                                        <v-badge color="none" right>{{props.item.name}}<span slot="badge"
                                                                                             style="color: red"
                                                                                             v-if="props.item.hot">熱</span><span
                                                slot="badge" style="color: darkgoldenrod"
                                                v-else-if="props.item.new">新</span></v-badge>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <span class="subheading">獲得方法: <v-chip>{{props.item.price}}</v-chip></span>
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
    import weapons from '../../public/json/weapons'

    export default {
        name: "Weapons",
        data() {
            return {
                selected_type: '所有',
                selected_guns: '所有',
                search: '',
                weapons: weapons,
                rowsPerPageItems: [6, 12, 24, {text: "All", value: -1}],
                pagination: {
                    rowsPerPage: 24,
                    descending: false,
                    sortBy: "priority"
                },
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile;
            },
            gun_list() {
                let array = [];
                let result = this.weapons.guns.filter((item) => item.type === this.selected_type || this.selected_type === '所有');
                result.forEach(t => array.push(t.gun));
                if (array.length > 1) array.push("所有");
                return array
            },
            type_list() {
                let array = this.weapons.types;
                if (array.length > 1) array.push("所有");
                return array;
            }
        },
        methods: {
            filteredItems(items, search) {
                let result = items;
                if (this.selected_type !== '所有') result = items.filter(r => r.type === this.selected_type);
                if (this.selected_guns !== '所有') result = items.filter(r => r.gun === this.selected_guns);
                if (search.length > 0) result = items.filter(r => r.name.match(search) || r.gun.match(search) || r.type.match(search));
                return result;
            }
        },
        mounted() {
            this.pagination.rowsPerPage = this.isMobile ? 6 : 24
        }
    }
</script>

<style scoped>

</style>