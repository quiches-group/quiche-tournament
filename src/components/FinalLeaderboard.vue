<template>
  <div>
    <div class="title">
      <div
        v-if="
          actualTournament !== undefined &&
          actualTournament.value.podium.length > 0
        "
      >
        <h1>Final Leaderboard</h1>
      </div>
      <div v-else>
        <h1>You haven't finish a tournament.</h1>
      </div>
    </div>
    <div
      class="container"
      v-if="
        actualTournament !== undefined &&
        actualTournament.value.podium.length > 0
      "
    >
      <div class="leaderboard">
        <div
          v-for="(player, index) in playerRanked"
          :key="player.id"
          class="scoreboard"
        >
          <img
            class="classementImg"
            :src="getClassementLogo(imageLeaderboard[index].image)"
            alt=""
          />
          <div class="player">{{ player.name }}</div>
          <q-separator class="separator"></q-separator>
        </div>
      </div>
      <div class="right">
        <q-card id="card" class="card">
          <q-card-title> La victoire est pour</q-card-title>
          <q-card-content>
            <div class="winner">
              <img
                class="party"
                src="../assets/party-time.gif"
                alt="party-time"
              />
              <h2>{{ playerRanked[0].name }}</h2>
              <img
                class="party"
                src="../assets/party-time.gif"
                alt="party-time"
              />
            </div>
          </q-card-content>
        </q-card>
      </div>
      <div class="endButton">
        <q-button class="homeButton" @click="routeToHome">Home</q-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTournaments } from "@/stores/tournaments.js";

const route = useRoute();
const tournaments = useTournaments();

const actualTournament = ref(tournaments.get(route.params.tournamentId));

const router = useRouter();
const playerRanked = computed(() => {
  return actualTournament.value.podium;
});

const imageLeaderboard = computed(() => {
  return [
    { image: "../assets/first.png" },
    { image: "../assets/second.png" },
    { image: "../assets/third.png" },
    { image: "../assets/fourth.png" },
  ];
});

const getClassementLogo = (path) => {
  return new URL(path, import.meta.url).href;
};

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

.scoreboard {
  @apply w-full flex flex-row flex-wrap justify-evenly items-center p-3;
}

.classementImg {
  @apply max-h-14;
}

.separator {
  @apply w-full;
}

.right {
  @apply flex  h-28 w-full
  lg:h-full lg:w-56;
}

.card {
  @apply w-full bg-opacity-20 items-center align-middle justify-center
  lg:h-48;
}

.winner {
  @apply flex flex-row justify-between items-center;
}

.party {
  @apply max-h-14 w-auto;
}
.endButton {
  @apply mt-20
  lg:w-full lg:flex lg:items-center;
}
.homeButton {
  @apply lg:flex-1 lg:mx-auto lg:max-w-xs;
}
</style>
