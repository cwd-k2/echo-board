import 'destyle.css';
import '@/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import { routes } from '@/routes';

import { installPseudoFetch } from './lib/pseudo-fetch';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

// 擬似 fetch の初期化
installPseudoFetch();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
