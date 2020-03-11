import Vue, { VNode } from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import { createRouter } from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import VueCookies from 'vue-cookies';

library.add(faTimes);

Vue.use(VueCookies);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('cc-input', () => import('@/components/structure/input/Input.vue'));
Vue.component('s-template', () => import('@/components/templates/Standard.vue'));
Vue.component('cc-button', () => import('@/components/structure/button/Button.vue'));
Vue.component('cc-modal', () => import('@/components/structure/modal/Modal.vue'));

export const createApp = (data: any): { app: App; router: Router; store: any } => {
    const router = createRouter();

    const store: any = data;
    Vue.prototype.$store = store;

    Vue.config.productionTip = false;

    const app = new Vue({
        router,
        render: (h): VNode => h(App),
    });

    return { app, router, store };
};
