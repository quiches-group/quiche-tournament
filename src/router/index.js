import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VersusView from "../views/VersusView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tournament/:tournamentId",
      name: "tournament",
      component: VersusView,
    },
  ],
});

export default router;
