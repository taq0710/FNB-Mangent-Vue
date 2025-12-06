import { createRouter, createWebHistory } from "vue-router";

import DashboardPage from "../pages/DashboardPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import EmployeePage from "../pages/EmployeePage.vue";

const routes = [
  { path: "/", name: "dashboard", component: DashboardPage },
  { path: "/products", name: "products", component: ProductPage },
  { path: "/employees", name: "employees", component: EmployeePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
