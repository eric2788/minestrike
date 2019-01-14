<template>
    <v-content>
        <v-container pa-0>
            <v-card :class="i!==0 ? 'mt-3' : ''" :key="i" v-for="(h,i) in content">
                <v-card-title class="headline info darken-2 white--text">{{h.title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-html="h.html_content"></v-card-text>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    import tutorial from '../../public/json/tutorials'

    export default {
        name: "Tutorial",
        data() {
            return {
                tutorial: tutorial,
            }
        },
        computed: {
            content() {
                let result = [];
                result = Array.from(this.tutorial).find(item => item.name === this.type);
                return result.content;
            },
            type() {
                return this.$store.state.tutorial
            }
        },
        beforeCreate() {
            fetch('./json/tutorials.json').then(r => r.json()).then(res => this.tutorial = Array.from(res)).catch(() => this.tutorial = tutorial);
        }
    }
</script>

<style scoped>

</style>