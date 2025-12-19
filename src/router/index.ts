import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { isAuthenticated } from "../services/authService";

import DashboardPage from "../pages/DashboardPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import EmployeePage from "../pages/EmployeePage.vue";
import LoginPage from "../pages/LoginPage.vue";

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  { 
    path: "/login", 
    name: "login", 
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  { 
    path: "/", 
    name: "dashboard", 
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  { 
    path: "/products", 
    name: "products", 
    component: ProductPage,
    meta: { requiresAuth: true }
  },
  { 
    path: "/employees", 
    name: "employees", 
    component: EmployeePage,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false;
  const authenticated = await isAuthenticated();

  if (requiresAuth && !authenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && authenticated) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;

