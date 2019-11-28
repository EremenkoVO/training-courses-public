import * as fb from 'firebase';

class Article {
    constructor (nameArticle, pdfFile='', id = null) {
        this.nameArticle = nameArticle;
        this.pdfFile = pdfFile;
        this.id = id;
    }
}

export default {
    state: {
        articles: []
    },
    mutations: {
        createdArticles(state, payload){
            state.articles.push(payload);
        },

        loadArticles(state, payload){
            state.articles = payload;
        }
    },
    actions: {
        //Создание статьи
        async createArticle({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newArticle = new Article(
                    payload.nameArticle,
                    payload.pdfFile
                );

                const article = fb.database().ref('article').push(newArticle);
                const pdfExt = 'pdf';

                const fileData = await fb.storage().ref(`Articles/${article.key}.${pdfExt}`).put(payload.pdfFile);
                const pdfFile = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL();

                await fb.database().ref('article').child(article.key).update({
                    pdfFile
                  });


                commit('setLoading', false);
                commit('createdArticles', {
                    ...newArticle,
                    id: article.key,
                });

                commit('clearSuccess');
                commit('setSuccess', 'Статья создана');
            }
            catch(error) {
                commit('setError', error.message);
                commit('setLoading', true);
                throw error;
            }
        },

        // Загрузка всех статей
        async fetchArticles({commit}){
            commit('clearError');
            commit('setLoading', true);

            const resultArticle = [];

            try {
                const fbArticles = await fb.database().ref('article').once('value');
                const articles = fbArticles.val();

                Object.keys(articles).forEach(key => {
                    const article = articles[key];
                    resultArticle.push(
                        new Article(article.nameArticle, article.pdfFile, key)
                    );
                });

                commit('loadArticles', resultArticle);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Удаление статьи
        async deleteArticle({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await fb.database().ref('article').child(payload).remove();
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        }
    },
    getters: {
        articles(state) {
            return state.articles;
        }
    }
};