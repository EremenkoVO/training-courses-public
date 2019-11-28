<template>
    <div>
        <v-container>
            <h1 style="text-align:center">Конструктор</h1>

            <v-btn
                bottom
                color="pink"
                dark
                fab
                fixed
                right
                @click="dialog = !dialog"
                >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" width="800px">
                <v-card>
                    <v-card-title>
                    Загрузка статьи
                    </v-card-title>
                    <v-container grid-list-sm>
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                            v-model="nameArticle"
                            prepend-icon="mdi-file"
                            placeholder="Навзание статьи"
                        ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <input type="file" ref="fileInput" @change="setFile">
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="dialog = false"
                    >Отмена</v-btn>
                    <v-btn
                        text
                        @click="createArticle()"
                    >Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card
                id="articles"
                class="mx-auto"
                v-for="a in articles"
                :key="a.id"
            >
            <v-card-title>
                <v-avatar class="avatar" color="indigo" size="28"><v-icon dark="">mdi-file</v-icon></v-avatar>
                {{a.nameArticle}}
            </v-card-title>
            <v-card-actions>
                <v-btn @click="deleteArticle(a.id)">
                    Удалить
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            fileInput: [],
            pdf: [],
            nameArticle: null
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading;
        },

        profiles () {
            return this.$store.getters.profiles;
        },

        articles () {
            return this.$store.getters.articles
        }
    },
    methods: {
        setFile() {
            this.pdf = this.$refs.fileInput.files[0];
        },

        createArticle() {
            const article = {
                nameArticle: this.nameArticle,
                pdfFile: this.pdf
            };

            this.$store.dispatch('createArticle', article);
            this.dialog = false;
        },

        deleteArticle(id) {
            this.$store.dispatch('deleteArticle', id);
            this.$store.dispatch('fetchArticles');
        }
    },
    created() {
        this.$store.dispatch('fetchArticles');
    }    
}
</script>

<style scoped>
.avatar {
    margin-right: 10px;
}

#articles {
    margin: 10px;
}
</style>