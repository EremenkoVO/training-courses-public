import Vue from 'vue';
import Vuex from 'vuex';
import shared from './shared';
import user from './user';
import profile from './profile';
import forum from './forum';
import constructorA from './constructor';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shared, user, profile, forum, constructorA
    }
});
