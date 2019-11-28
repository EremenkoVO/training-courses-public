import * as fb from 'firebase';

class ForumBrach {
    constructor (nameBranch, dateCreate, ownerId, id=null) {
        this.nameBranch = nameBranch;
        this.dateCreate = dateCreate;
        this.ownerId = ownerId;
        this.id = id;
    }
}

class Branch {
    constructor (ownerId, dateCreate, message, idForumBranch, id=null) {
        this.ownerId = ownerId;
        this.dateCreate = dateCreate;
        this.message = message;
        this.idForumBranch = idForumBranch;
        this.id = id;
    }
}

export default {
    state: {
        forumBranch: [],
        branch: []
    },
    mutations: {
        setForumBranch(state, payload) {
            state.forumBranch.push(payload);
        },

        loadForumBranch(state, payload) {
            state.forumBranch = payload;
        },

        setBranch(state, payload) {
            state.branch.push(payload);
        },

        loadBranch(state, payload) {
            state.branch = payload;
        }
    },
    actions: {
        // Создание ветки форума
        async createforumBranch({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newForumBrach = new ForumBrach (
                    payload.nameBranch,
                    payload.dateCreate,
                    getters.user.id
                );

                const forumBranch = await fb.database().ref('forumBranch').push(newForumBrach);

                commit('setLoading', false);
                commit('setForumBranch', {
                    ...newForumBrach,
                    id: forumBranch.key
                });

                commit('clearSuccess');
                commit('setSuccess', 'Ветка создана');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', true);
                throw error;
            }
        },

        // Загрузка ветки форума
        async fetchForumBranch ({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultForumBranch = [];

            try {
                const fbForumBranch = await fb.database().ref('forumBranch').once('value');
                const forumBranchs = fbForumBranch.val();

                Object.keys(forumBranchs).forEach(key => {
                    const forumBranch = forumBranchs[key];
                    resultForumBranch.push(
                        new ForumBrach(forumBranch.nameBranch, forumBranch.dateCreate, forumBranch.ownerId, key)
                        );
                });

                commit('loadForumBranch', resultForumBranch);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        // Создание сообщение на ветке форума
        async createMessage({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newBranch = new Branch (
                    getters.user.id,
                    payload.dateCreate,
                    payload.message,
                    payload.idForumBranch
                );

                const branch = fb.database().ref('branch').push(newBranch);

                commit('setLoading', false);
                commit('setBranch', {
                    ...newBranch,
                    id: branch.key
                });

                commit('clearSuccess');
                commit('setSuccess', 'Сообщение отправленно');
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', true);
                throw error;
            }
        },

        // Получаем данные с ветки форума
        async fetchBranch ({commit}) {
            commit('clearError');
            commit('setLoading', true);

            const resultBranch = [];

            try {
                const fbBranch = await fb.database().ref('branch').once('value');
                const branchs = fbBranch.val();

                Object.keys(branchs).forEach(key => {
                    const branch = branchs[key];
                    resultBranch.push(
                        new Branch(branch.ownerId, branch.dateCreate, branch.message, branch.idForumBranch, key)
                    );
                });

                commit('loadBranch', resultBranch);
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
        forumBranchs(state) {
            return state.forumBranch;
        },

        branch(state) {
            return state.branch;
        },

        forumBranchId(state) {
            return forumBranchId => {
                return state.forumBranch.find(forumBranch => forumBranch.id === forumBranchId);
            };
        },

        branchMessagesId(state) {
            return branchMessagesId => {
                return state.branch.find(branch => branch.idForumBranch === branchMessagesId);
            };
        }
    }
};