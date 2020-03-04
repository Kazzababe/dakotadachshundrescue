import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const createRouter = (): Router => {
    return new Router({
        mode: 'history',
        routes: [
            { name: 'home', path: '/', component: () => import('@/pages/Home.vue') },
            { name: 'login', path: '/auth/login', component: () => import('@/pages/auth/Login.vue') },
            { name: 'register', path: '/auth/register', component: () => import('@/pages/auth/Register.vue') },
        ],
    });
};
