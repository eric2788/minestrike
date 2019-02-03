<template>
    <v-content>
        <v-container pa-0>
            <v-tabs color="primary darken-3" dark show-arrows v-if="!loading">
                <v-tab :key="i" v-for="(tut,i) in types">
                    {{tut}}
                </v-tab>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab-item :key="i" v-for="(tut,i) in types">
                    <br>
                    <v-data-iterator :custom-filter="searchTitle" :items="tutorials.filter(data=>tut === data.type)"
                                     :pagination.sync="pagination"
                                     :rows-per-page-items="rowsPerPageItems" :search="search"
                                     content-tag="div" no-data-text="沒有文章" no-results-text="找不到此文章"
                                     rows-per-page-text="每頁文章數：">
                        <template slot="item" slot-scope="props">
                            <v-card :class="props.index!==0 ? 'mt-3' : ''" style="margin-right: 3px;margin-left: 3px">
                                <v-card-title class="headline info darken-2 white--text">{{props.item.title}}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <tui-editor-viewer :value="props.item.content"></tui-editor-viewer>
                                </v-card-text>
                            </v-card>
                        </template>
                        <template slot="pageText" slot-scope="props">
                            正在列出 {{ props.pageStart }} - {{ props.pageStop }} 項, 總項目: {{ props.itemsLength }}
                        </template>
                    </v-data-iterator>
                </v-tab-item>
            </v-tabs>
            <v-progress-linear height="3" indeterminate v-else></v-progress-linear>
            <v-toolbar class="pt-4 white transparent" flat slot="footer">
                <v-text-field :style="!isMobile ? 'padding-left: 70%' : ''" append-icon="search" label="搜索教學標題"
                              v-model="search"></v-text-field>
            </v-toolbar>
        </v-container>
    </v-content>
</template>

<script>
    import TuiEditorViewer from "@toast-ui/vue-editor/src/Viewer";
    export default {
        name: "Tutorial",
        components: {TuiEditorViewer},
        data() {
            return {
                search: '',
                rowsPerPageItems: [1, 3, 5, {text: "All", value: -1}],
                pagination: {
                    rowsPerPage: 1,
                    descending: true,
                    sortBy: "index"
                },
                tutorials: [],
                loading: false,
                tut_types: [],

            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            },
            types() {
                let result = [];
                this.tutorials.forEach(data => {
                    if (!result.includes(data.type)) result.push(data.type)
                });
                return result;
            }
        },
        methods: {
            searchTitle(item, search) {
                let result = item;
                if (search.length > 0) result = item.filter(item => item.title.match(search));
                return result;
            },
            async get_Tutorials() {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'tutorial'
                }).then(res => {
                    this.tutorials = res.data;
                }).catch().finally(() => this.loading = false)
            }
        },
        mounted() {
            this.get_Tutorials();
        }
    }
</script>

<style scoped>

</style>