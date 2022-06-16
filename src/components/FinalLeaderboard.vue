<template>
  <div>
    <div class="title">
      <h1>Final Leaderboard</h1>
    </div>
    <div class="container">
      <div class="leaderboard">
        <div v-for="player in playerRanked" :key="player" class="scoreboard">
          <div class="player">{{ player }}</div>
          <q-separator></q-separator>
        </div>
      </div>
      <div class="right">
        <q-card id="card" class="card will-change-transform">
          <q-card-title> La victoire est pour</q-card-title>
          <q-card-content>
            <div class="flex flex-row justify-between items-center">
              <img class="party" src="../assets/party-time.gif" />
              <h2>{{ playerRanked["1"] }}</h2>
              <img class="party" src="../assets/party-time.gif" />
            </div>
          </q-card-content>
        </q-card>
      </div>
      <div class="lg:w-full lg:flex lg:items-center mt-20">
        <q-button class="homeButton" @click="routeToHome">Home </q-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const playerRanked = computed(() => {
  return { 1: "Player 1", 2: "Player 2", 3: "Player 3", 4: "Player 4" };
});

const routeToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.title {
  @apply absolute font-bold text-4xl left-1/2 -translate-x-1/2 mb-6;
}

.container {
  @apply flex flex-col pt-6 justify-around items-center w-full
  md:px-8
  lg:p-20 lg:w-full lg:flex-row lg:flex-wrap;
}

.leaderboard {
  @apply flex  w-full flex-col flex-wrap items-center my-16  p-4 rounded-2xl bg-opacity-20 shadow-2xl bg-white
  lg:w-56;
}

.right {
  @apply flex  h-28 w-full
  lg:h-full lg:w-56;
}

.scoreboard {
  @apply w-full flex flex-col items-center p-3;
}

.card {
  @apply w-full bg-opacity-20 items-center align-middle justify-center
  lg:h-48;
}

.party {
  @apply max-h-14 w-auto;
}

.homeButton {
  @apply lg:flex-1 lg:mx-auto lg:max-w-xs;
}
</style>
