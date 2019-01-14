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
    export default {
        name: "Tutorial",
        data() {
            return {
                tutorial: [],
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
    }
</script>

<style scoped>

</style>