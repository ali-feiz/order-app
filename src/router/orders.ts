export default {
  name: "ordersPage",
  path: "/orders",
  component: () => import("@/views/orders.vue"),
  meta: {
    public: true,
    title: "orders.orders",
    layout: "Public",
  },
};
