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
            { name: 'browse', path: '/browse', component: () => import('@/pages/browse/Search.vue') },
            { name: 'dashboard', path: '/dashboard', component: () => import('@/pages/dashboard/Dashboard.vue') },
            {
                name: 'settings',
                path: '/dashboard/settings',
                component: () => import('@/pages/dashboard/Settings.vue'),
            },
            {
                name: 'upload',
                path: '/dashboard/upload',
                component: () => import('@/pages/dashboard/Dashboard.vue'),
                props: { stage: 'redirect' },
            },
            {
                name: 'upload:stage',
                path: '/dashboard/upload/:stage',
                component: () => import('@/pages/dashboard/Dashboard.vue'),
                props: true,
            },
        ],
    });
};
