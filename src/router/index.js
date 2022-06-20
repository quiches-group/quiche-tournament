import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VersusView from "../views/VersusView.vue";
import FinalLeaderboardView from "../views/FinalLeaderboardView.vue";
import FaqView from "../views/FaqView.vue";
import NotFoundView from "../views/NotFoundView.vue";

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
    {
      path: "/leaderboard/:tournamentId",
      name: "leaderboard",
      component: FinalLeaderboardView,
    },
    {
      path: "/faq",
      name: "faq",
      component: FaqView,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
});

export default router;
