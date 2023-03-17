import {
  createRouter as _createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

const Layout = () => import("@/components/Layout.vue");
const NotFound = () => import("@/views/NotFound.vue");

const appRoutes = _getAppRoutes();
const routes = [
  {
    path: "/401",
    name: "401",
    component: () => import("../views/401.vue"),
  },
  {
    path: "/",
    redirect: "/shortcut/home",
  },
  {
    path: "/shortcut",
    component: Layout,
    children: [
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: "/:pathMatch(app|shortcut)",
    name: "layout",
    component: Layout,
    children: appRoutes,
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = _createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

// 获取所有子应用路由
function _getAppRoutes() {
  const modules = import.meta.glob(`@/views/app/*.vue`);
  const appRoutes = [];
  for (const path in modules) {
    let [name] = path.match(/[^/]+(?=\.vue$)/)!;
    name = `${name[0].toLowerCase()}${name.slice(1)}`;
    appRoutes.push({
      path: `${name}/:path+`,
      name,
      component: modules[path],
    });
  }
  return appRoutes;
}
