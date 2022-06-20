<template>
  <div class="match">
    <div class="tournamentInfo">
      <p class="tournamentStep">{{ actualRound.name }}</p>
      <p class="roundStep">
        {{
          `${this.actualRound.actualBattleIndex + 1} / ${
            this.actualRound.battles.length
          }`
        }}
      </p>
    </div>
    <roundVersus :players="players" @winner="setWinner"></roundVersus>
    <div
      class="centered"
      :class="{
        'opacity-0': !isTournamentEnd,
        'pointer-events-none': !isTournamentEnd
      }"
    >
      <q-button variant="plain-rounded" size="large" @click="endTournament">
        Terminer
      </q-button>
    </div>
    <div
      class="centered"
      :class="{
        'opacity-0': !isMatchEnd,
        'pointer-events-none': !isMatchEnd
      }"
    >
      <q-button variant="plain-rounded" size="large" @click="nextBattle">
        Match suivant
      </q-button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useTournaments } from "@/stores/tournaments.js";
import RoundVersus from "../components/RoundVersus.vue";

const route = useRoute();
const tournament = useTournaments();
const actualTournament = ref(tournament.get(route.params.tournamentId));
const actualRound = computed(() => {
  return actualTournament.value.actualRound().value;
});
const actualBattle = computed(() => {
  return actualRound.value.actualBattle().value;
});
const players = computed(() => {
  return actualBattle.value.players;
});
const isTournamentEnd = computed(() => {
  return actualRound.value.name === "Finale" && winner.name;
});

const isMatchEnd = computed(() => {
  return actualRound.value.name !== "Finale" && winner.name;
});
const winner = reactive({
  id: undefined,
  name: undefined,
  victory: undefined,
});
const setWinner = (newWinner) => {
  winner.id = newWinner.id;
  winner.name = newWinner.name;
  winner.victory = newWinner.victory;
};

function nextBattle() {
  actualRound.value.win(actualBattle.value.id, winner.id);
  setWinner({
    id: undefined,
    name: undefined,
    victory: undefined,
  });
}

function endTournament() {
  actualRound.value.win(actualBattle.value.id, winner.id);
  router.push({
    name: "leaderboard",
    params: { tournamentId: actualTournament.value.id },
  });
}
</script>

<style scoped>
.match {
  @apply h-screen flex flex-col justify-evenly py-32;
}

.tournamentInfo {
  @apply flex flex-col justify-center content-center;
}

.tournamentStep {
  @apply text-center text-white text-3xl font-semibold
  md:text-5xl;
}

.roundStep {
  @apply text-center text-white text-2xl
  py-5;
}

.centered {
  @apply flex flex-none justify-center pt-3;
}
</style>
