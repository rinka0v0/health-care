import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Setting from "../views/Setting.vue";
import Detail from "../views/Detail.vue";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { STATIC_ROUTES } from "./routes";
import store from "@/store";
import { doc, getDoc, setDoc } from "firebase/firestore";

const routes: Array<RouteRecordRaw> = [
  {
    path: STATIC_ROUTES.INDEX,
    name: "Index",
    component: Index,
  },
  {
    path: STATIC_ROUTES.HOME,
    name: "home",
    component: Home,
    meta: { requireAuth: true },
    beforeEnter: async (to, from, next) => {
      // Indexからhomepageへリダイレクトしてきたときに検証する
      if (from.path === "/") {
        const result = await getRedirectResult(auth);
        if (result) {
          const uid = result.user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            setDoc(doc(db, "users", uid), {
              name: result.user.displayName,
              iconURL: result.user.photoURL,
            });
          }
        }
      }
      next();
    },
  },
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
      if (user) {
        next();
        store.commit("setAuth", user.uid);
      } else {
        next({ path: STATIC_ROUTES.INDEX });
      }
    });
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next({ path: STATIC_ROUTES.HOME });
        store.commit("setAuth", user.uid);
      } else {
        next();
      }
    });
  }
});

export default router;
