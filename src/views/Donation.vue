<template>
    <v-content>
        <v-container pa-0>
            <v-card :class="i!==0 ? 'mt-3' : ''" :key="i" v-for="(h,i) in donation">
                <v-card-title class="headline info darken-2 white--text">{{h.title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-html="h.html_content"></v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    import donation from '../../public/json/donation'

    export default {
        name: "Donation",
        data() {
            return {donation: []}
        },
        beforeCreate() {
            fetch('./json/donation.json').then(r => r.json()).then(res => this.donation = res).catch(() => this.donation = donation);
        }
    }
</script>

<style scoped>

</style>