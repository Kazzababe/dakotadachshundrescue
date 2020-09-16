import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const createRouter = (): Router => {
    return new Router({
        mode: 'history',
        routes: [
            { name: 'home', path: '/', component: () => import('@/pages/Home.vue') },
            { name: 'create', path: '/create', component: () => import('@/pages/Create.vue') },
            { name: 'join', path: '/join', component: () => import('@/pages/Join.vue') },
            { name: 'game', path: '/game/:code', component: () => import('@/pages/Game.vue') },
        ],
    });
};
