<template>
  <div class="match">
    <div class="tournamentInfo">
      <p class="tournamentStep">Quart de finale</p>
      <p class="roundStep">1/4</p>
    </div>
    <roundVersus :players="players" @winner="setWinner"></roundVersus>
    <div class="centered">
      <q-button
        v-show="winner.name !== ''"
        variant="plain-rounded"
        size="large"
      >
        Match suivant
      </q-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import RoundVersus from "../components/RoundVersus.vue";

const players = ref([
  {
    name: "Nicolas",
    victory: "3 victory",
  },
  {
    name: "Hugo",
    victory: "1 Victory",
  },
]);

const winner = reactive({
  name: "",
  victory: "",
});

const setWinner = (newWinner) => {
  winner.name = newWinner.name;
  winner.victory = newWinner.victory;
};
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
