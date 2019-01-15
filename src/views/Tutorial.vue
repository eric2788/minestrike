<template>
    <v-content>
        <v-container pa-0>
            <v-data-iterator :custom-filter="searchTitle" :items="content"
                             :pagination.sync="pagination"
                             :rows-per-page-items="rowsPerPageItems" :search="search"
                             content-tag="div" no-data-text="沒有文章" no-results-text="找不到此文章"
                             rows-per-page-text="每頁文章數：">
                <template slot="item" slot-scope="props">
                    <v-card :class="props.index!==0 ? 'mt-3' : ''">
                        <v-card-title class="headline info darken-2 white--text">{{props.item.title}}</v-card-title>
                <v-divider></v-divider>
                        <v-card-text v-html="props.item.html_content"></v-card-text>
            </v-card>
                </template>
                <v-toolbar class="pt-4 white transparent" flat slot="footer">
                    <v-text-field :style="!isMobile ? 'padding-left: 70%' : ''" append-icon="search" label="搜索教學標題"
                                  v-model="search"></v-text-field>
                </v-toolbar>
            </v-data-iterator>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Tutorial",
        data() {
            return {
                search: '',
                rowsPerPageItems: [3, 5, 10, {text: "All", value: -1}],
                pagination: {
                    rowsPerPage: 3,
                    descending: true,
                    sortBy: "index"
                }
            }
        },
        computed: {
            type() {
                return this.$store.state.tutorial
            },
            content() {
                let tutorial = this.$store.state.tutorial_json;
                let result = [];
                result = tutorial.find(item => item.name === this.type);
                return result.content;
            }
        },
        methods: {
            searchTitle(item, search) {
                let result = item;
                if (search.length > 0) result = item.filter(item => item.title.match(search));
                return result;
            }
        }
    }
</script>

<style scoped>

</style>