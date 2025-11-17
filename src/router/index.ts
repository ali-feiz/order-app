import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import Orders from "./orders";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/orders",
    children: [Orders],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
