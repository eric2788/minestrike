<template>
  <v-content>
    <v-container pa-0>
      <v-card :class="i!==0 ? 'mt-3' : ''" :key="i" v-for="(h,i) in home">
        <v-card-title class="headline info darken-2 white--text">{{h.title}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-html="h.html_content"></v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>
<script>
  import home from '../../public/json/home'
  export default {
    name: 'Home',
    data() {
      return {
        home: []
      }
    },
    beforeCreate() {
      fetch('./json/home.json').then(r => r.json()).then(res => this.home = res).catch(() => this.home = home)
    }
  }
</script>
