<template>
    <v-container>
        <v-card>
            <v-card-title class="info darken-3 white--text headline">
                修改武器
                <v-spacer></v-spacer>
                <v-menu left offset-y>
                    <v-btn class="info" fab slot="activator" small>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile :key="i" @click="select_box(wea.id)" v-for="(wea,i) in weapons">
                            <v-list-tile-title>{{wea.title}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="addNew">
                            <v-list-tile-title>
                                <v-icon left small>add</v-icon>
                                添加新武器
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
            <v-card-text>
                hello world
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Weapons",
        data() {
            return {
                gun: '',
                type: '',
                src: '',
                name: '',
                color: '',
                text: '',
                price: '',
                new: false,
                hot: false,

                weapons: [],
            }
        },
        methods: {
            select_box(id) {

            },
            addNew() {
                
            }
        }
    }
</script>

<style scoped>

</style>