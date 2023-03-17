import { createRouter, createWebHistory, type Router } from "vue-router";

const routes = [
  {
    path: '/blank',
    name: 'Blank',
    component: () => import("@/views/blank.vue"),
  },
  {
    path: "/",
    // redirect: "/home",
    component: () => import("@/packages/Layout/index.vue"),
    children: [
      {
        path: "home",
        meta: { title: "首页" },
        component: () => import("@/views/home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_URL_BASE),
  routes: routes,
});

export default router;
