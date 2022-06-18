<template>
  <div class="match">
    <div class="tournamentInfo">
      <p class="tournamentStep">Quart de finale</p>
      <p class="roundStep">
        {{
          `${this.actualRound.actualBattleIndex + 1} / ${
            this.actualRound.battles.length
          }`
        }}
      </p>
    </div>
    <roundVersus :players="players" @winner="setWinner"></roundVersus>
    <div class="centered" v-if="isTournamentEnd">
      <q-button variant="plain-rounded" size="large" @click="endTournament">
        Terminer
      </q-button>
      {{ winner.name }}
    </div>
    <div class="centered" v-else-if="winner.name">
      <q-button variant="plain-rounded" size="large" @click="nextBattle">
        Match suivant
      </q-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
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
  return (
    actualTournament.value.podium.length ===
      actualTournament.value.players.length ||
    actualTournament.value.podium.length === 4
  );
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
    id: "",
    name: "",
    victory: "",
  });
}

function endTournament() {
  actualRound.value.win(actualBattle.value.id, winner.id);
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
  underline underline-offset-2 decoration-quiche-purple/50 decoration-4
  md:text-5xl;
}

.roundStep {
  @apply text-center text-white text-2xl
  py-5;
}

.centered {
  @apply flex justify-center;
}
</style>
