<template>
  <div v-if="allTournaments === undefined" class="noTournament">
    <h3>Aucun tournoi n'a été joué pour le moment.</h3>
  </div>
  <swiper
    class="swiper"
    v-else-if="allTournaments !== undefined"
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="tournament in allTournaments" :key="tournament.id">
      <q-card class="tournamentCard">
        <q-card-title class="title"
          >Tournois numéro : {{ tournament.id + 1 }}</q-card-title
        >
        <q-card-title class="title">{{ tournament.name }}</q-card-title>
        <q-card-content>
          <div class="container">
            <div class="leaderboard">
              <div
                v-for="(player, index) in tournament.podium"
                :key="player.id"
                class="scoreboard"
              >
                <img
                  class="podiumImg"
                  :src="getClassementLogo(imageLeaderboard[index].image)"
                  alt=""
                />
                <div class="player">{{ player.name }}</div>
                <q-separator class="separator"></q-separator>
              </div>
            </div>
          </div>
        </q-card-content>
      </q-card>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useTournaments } from "@/stores/tournaments.js";

const tournaments = useTournaments();
const allTournaments = computed(() => {
  return tournaments.list;
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

const onSwiper = () => {};
const onSlideChange = () => {};
</script>

<style scoped>
.tournamentCard {
  @apply flex flex-col
  w-full
  bg-opacity-20;
}

.noTournament {
  @apply flex flex-row justify-center;
}

.title {
  @apply self-center
  pt-5;
}

.container {
  @apply self-center;
}

.leaderboard {
  @apply flex  w-full flex-col flex-wrap items-center my-16 p-4 rounded-2xl bg-opacity-20 shadow-2xl bg-transparent;
}

.scoreboard {
  @apply w-full flex flex-row flex-wrap justify-between items-center p-3;
}

.podiumImg {
  @apply max-h-14;
}

.separator {
  @apply w-full;
}
</style>
