<template>
  <div class="round">
    <q-card
      class="playerCard"
      :class="{
        'border-4': winner.name === players[0].name,
        'border-b-green-500': winner.name === players[0].name,
        'border-solid': winner.name === players[0].name,
      }"
      @click="choose(players[0])"
    >
      <q-card-title>{{ players[0].name }}</q-card-title>
      <q-card-content>{{ players[0].victory }}</q-card-content>
      <span></span>
    </q-card>

    <img class="logo" src="../assets/vsLogo.png" alt="Versus logo" />

    <q-card
      class="playerCard"
      :class="{
        'border-4': winner.name === players[1].name,
        'border-b-green-500': winner.name === players[1].name,
        'border-solid': winner.name === players[0].name,
      }"
      @click="choose(players[1])"
    >
      <q-card-title>{{ players[1].name }}</q-card-title>
      <q-card-content>{{ players[1].victory }}</q-card-content>
      <span></span>
    </q-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

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

const choose = (player) => {
  if (winner !== player) {
    winner.name = player.name;
    winner.victory = player.victory;
  }
};
</script>

<style scoped>
.round {
  @apply flex flex-row flex-wrap justify-around items-center h-screen w-screen;
}
.playerCard {
  @apply flex flex-col justify-around items-center
  transform hover:scale-125 transition
  hover:shadow-2xl
  transform hover:border-2 border-green-500 border-dashed
  bg-opacity-20;
}

.logo {
  @apply aspect-square;
}
</style>
