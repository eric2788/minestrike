<template>
    <v-content>
        <v-container pa-0>
            <v-card>
                <v-card-title class="headline info darken-2 white--text">404 - 無法找到此頁面</v-card-title>
                <v-divider></v-divider>
                <v-img height="auto" src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png"></v-img>
                <v-card-text>
                    <v-btn :block="isMobile" @click="$router.forward()" class="info">返回上一頁</v-btn>
                </v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "NotFound",
        computed: {
            isMobile() {
                return this.$store.state.isMobile
            }
        }
    }
</script>

<style scoped>

</style>