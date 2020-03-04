import { createApp } from './main';
import Vue from 'vue';

const anyWindow = <any>window;
const { app, router } = createApp(anyWindow.__INITIAL_STATE__ || {});

// this assumes App.vue template root element has `id="app"`
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        fetch('/data' + to.fullPath, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log('error');
                    return;
                }
                Vue.prototype.$store = res.data;

                if (to.name === 'create') {
                    if (!res.data.user) {
                        return next(false);
                    }
                }
                next();
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.$mount('#app');
});
