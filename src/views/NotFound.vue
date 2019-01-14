<template>
    <v-content>
        <v-container pa-0>
            <v-card>
                <v-card-title class="headline info darken-2 white--text">404 - 無法找到此頁面</v-card-title>
                <v-divider></v-divider>
                <v-img max-height="700px" src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png"></v-img>
                <v-card-text>
                    <v-btn :block="isMobile" @click="global.toTop()" class="info" to="/">返回主頁</v-btn>
                </v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    import global from '../global-func'
    export default {
        name: "NotFound",
        data() {
            return {
                global: global()
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        }
    }
</script>

<style scoped>

</style>