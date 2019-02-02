<template>
  <v-app>
      <router-view></router-view>
      <v-content v-if="isMobile"></v-content>
  </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        computed: {
            isMobile() {
                let mobile = this.$vuetify.breakpoint.mdAndDown;
                this.$store.commit('updateMobile', mobile);
                return mobile;
            }
        },
    }
</script>
<style scoped>
    *, *::before, *::after {
        font-family: "Microsoft JhengHei", serif;
        transition: all .3s ease-in-out;
    }
</style>
