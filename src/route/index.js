import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './authGuard';
import Login from '@/components/User/Login';
import Registration from '@/components/User/Registration';
import Profile from '@/components/Profile/Profile';
import CreateProfile from '@/components/Profile/CreateProfile';
import Constructor from '@/components/Constructor/Articles';
import Forum from '@/components/Forum/MainPage';
import Branch from '@/components/Forum/Branch';
import Reader from '@/components/Constructor/Reader';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/profile/:id',
            props: true,
            name: 'profile',
            component: Profile,
            beforeEnter: AuthGuard
        },
        {
            path: '/createprofile',
            name: 'CreateProfile',
            component: CreateProfile,
            beforeEnter: AuthGuard
        },
        {
            path: '/acticles',
            name: 'Articles',
            component: Constructor,
            beforeEnter: AuthGuard
        },
        {
            path: '/forum',
            name: 'MainPage',
            component: Forum,
            beforeEnter: AuthGuard
        },
        {
            path: '/branch/:id',
            props: true,
            name: 'Branch',
            component: Branch,
            beforeEnter: AuthGuard
        },
        {
            path: '/article/:id',
            props: true,
            name: 'Reader',
            component: Reader,
            beforeEnter: AuthGuard
        }
    ],
    mode: 'history'
});
