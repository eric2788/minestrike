<template>
  <v-content>
    <v-container pa-0>
      <v-card>
        <v-card-title class="info darken-3 white--text headline">公告列表</v-card-title>
        <v-card-text>
          <v-data-table :custom-filter="searchTitle" :headers="headers" :items="announce" :loading="loading"
                        :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems"
                        :search="search" class="elevation-1"
                        no-data-text="沒有文章" no-results-text="找不到此文章"
                        rows-per-page-text="每頁文章數：">
            <v-progress-linear height="3" indeterminate slot="progress"></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="font-weight-bold">
                <router-link :to="props.item.id.toString()" append>{{props.item.title}}</router-link>
              </td>
              <td class="text-xs-right">{{props.item.date}}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              正在列出 {{ props.pageStart }} - {{ props.pageStop }} 項, 總項目: {{ props.itemsLength }}
            </template>
          </v-data-table>
          <v-toolbar class="pt-4 white transparent" flat slot="footer">
            <v-text-field :style="!isMobile ? 'padding-left: 70%' : ''" append-icon="search" label="搜索文章標題"
                          v-model="search"></v-text-field>
          </v-toolbar>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>
<script>
  export default {
    name: 'AnnounceList',
    data() {
      return {
        headers: [
          {
            text: '標題',
            value: 'title',
            class: ['subheading', 'font-weight-light', 'primary darken-3', 'white--text', 'dark']
          },
          {
            text: '發佈日期',
            value: 'date',
            align: 'right',
            class: ['subheading', 'font-weight-light', 'primary darken-3', 'white--text', 'dark']
          }
        ],
        search: '',
        rowsPerPageItems: [3, 5, 10, {text: "All", value: -1}],
        pagination: {
          rowsPerPage: 3,
          descending: true,
          sortBy: "index"
        },
        loading: false,
        announce: [],
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.isMobile;
      }
    },
    methods: {
      searchTitle(item, search) {
        let result = item;
        if (search.length > 0) result = item.filter(item => item.title.match(search));
        return result;
      },
      async get_announce() {
        this.loading = true;
        this.$axios({
          method: 'get',
          url: 'announce'
        }).then(res => this.announce = res.data).catch().finally(() => this.loading = false)
      }
    },
    mounted() {
      this.get_announce();
    }
  }
</script>
