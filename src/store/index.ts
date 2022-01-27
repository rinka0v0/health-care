import { createStore } from "vuex";

type User = {
  userId: string;
};

export default createStore({
  state: {
    auth: {
      userId: undefined,
    },
  },
  mutations: {
    setAuth(state, userId) {
      state.auth.userId = userId;
    },
  },
  actions: {},
  modules: {},
});
