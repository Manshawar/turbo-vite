export default [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard/index",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/notFound/404.vue"),
  },

];
