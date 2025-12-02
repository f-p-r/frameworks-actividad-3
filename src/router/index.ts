import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue';
import EspaciosPage from '@/pages/EspaciosPage.vue';
import CheckoutPage from '@/pages/CheckoutPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    meta: { title: 'Coworking Nexus' }
  },
  {
    path: '/espacios',
    name: 'espacios',
    component: EspaciosPage,
    meta: { title: 'Selección de Espacios - Nexus' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { title: 'Finalizar Reserva - Nexus' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Actualizar título de la página según la ruta
router.afterEach((to) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
});

export default router;
