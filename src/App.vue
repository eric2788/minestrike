<template>
  <v-app>
    <v-toolbar flat class="info darken-4" dark>
      <v-toolbar-side-icon v-if="isMobile"></v-toolbar-side-icon>
      <v-toolbar-title>MineStrike</v-toolbar-title>
      <v-btn flat to="/">首頁</v-btn>
      <v-btn flat to="/leaderboards">排行榜</v-btn>
    </v-toolbar>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      //
    }
  },
  computed: {
    isMobile(){
      return this.$store.state.isMobile;
    }
  },
  created(){
    let mobile = this.$vuetify.breakpoint.mdAndDown;
    window.console.log("mobile: "+mobile);
    this.$store.dispatch('updateMobile',mobile);
  }
}
</script>
