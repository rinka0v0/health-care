import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Setting from "../views/Setting.vue";
import Detail from "../views/Detail.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  { path: "/home", name: "home", component: Home, meta: { requireAuth: true } },
  {
    path: "/:date",
    name: "detail",
    component: Detail,
    meta: { requireAuth: true },
  },
  {
    path: "/:date/setting",
    name: "setting",
    component: Setting,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requireAuth);
  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      console.log(user, "login");
      if (user) {
        next();
      } else {
        next({ path: "/" });
      }
    });
  } else {
    onAuthStateChanged(auth, (user) => {
      console.log(user, "logout");

      if (user) {
        next({ path: "/home" });
      } else {
        next();
      }
    });
  }
});

export default router;
