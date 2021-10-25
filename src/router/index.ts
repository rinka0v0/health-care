import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Setting from "../views/Setting.vue";
import Detail from "../views/Detail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  { path: "/home", name: "home", component: Home },
  { path: "/:date", name: "detail", component: Detail },
  {
    path: "/:date/setting",
    name: "setting",
    component: Setting,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
