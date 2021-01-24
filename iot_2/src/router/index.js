import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // views
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/monitoring.vue"),
  },
  {
    path: "/controller",
    component: () => import("@/views/controller.vue"),
  },
  {
    path: "/timer",
    component: () => import("@/views/timer.vue"),
  },

  // components
  {
    path: "/mebubar",
    component: () => import("@/components/menuBar.vue"),
  },

  //temp
  {
    path: "/temp",
    component: () => import("@/views/temp.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
