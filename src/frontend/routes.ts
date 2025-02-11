import type { RouteRecordRaw } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import NotFound from './pages/NotFound.vue';

import NeedsLogin from './pages/NeedsLogin.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: NeedsLogin,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/:notFound(.*)',
    redirect: '404',
  },
];
