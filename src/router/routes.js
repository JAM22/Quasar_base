const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("pages/Login.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/access-denied",
    name: "error403",
    component: () => import("pages/errors/Error403"),
    meta: { title: "Acceso denegado" },
  },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true},
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/Index.vue"),
        meta: { title: "Inicio" },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("pages/User.vue"),
        meta: { title: "Usuarios" },
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/errors/Error404.vue"),
    meta: {title: 'Página no encontrada'}
  });
}

export default routes;
