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
                    if (res.code === 301) {
                        return next(res.path);
                    }
                    return;
                }
                Vue.prototype.$store = res.data;

                next();
            })
            .catch(err => {
                console.error('Encountered error:', err);
                window.location.replace(to.fullPath);
            });
    });

    app.$mount('#app');
});
