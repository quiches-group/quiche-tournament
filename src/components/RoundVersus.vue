<template>
  <div class="round">
    <q-card
      class="playerCard"
      :class="{
        'border-4': winner.name === props.players[0].name,
        'border-solid': winner.name === props.players[0].name,
      }"
      @click="choose(props.players[0])"
    >
      <q-card-title>{{ props.players[0].name }}</q-card-title>
      <q-card-content>{{ props.players[0].victory }}</q-card-content>
      <span></span>
    </q-card>

    <img class="logo" src="../assets/vsLogo.png" alt="Versus logo" />

    <q-card
      class="playerCard"
      :class="{
        'border-4': winner.name === props.players[1].name,
        'border-solid': winner.name === props.players[0].name,
      }"
      @click="choose(props.players[1])"
    >
      <q-card-title>{{ props.players[1].name }}</q-card-title>
      <q-card-content>{{ props.players[1].victory }}</q-card-content>
      <span></span>
    </q-card>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  players: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["winner"]);

const winner = reactive({
  name: "",
  victory: "",
});

const choose = (player) => {
  if (winner.name !== player.name) {
    winner.name = player.name;
    winner.victory = player.victory;
  } else {
    winner.name = "";
    winner.victory = "";
  }

  emit("winner", winner);
};
</script>

<style scoped>
.round {
  @apply flex flex-row flex-wrap justify-around items-center;
}
.playerCard {
  @apply flex flex-col justify-around items-center
  transform hover:scale-125 transition
  hover:shadow-2xl
  transform hover:border-2 border-green-500 border-solid
  bg-opacity-20;
}

.logo {
  @apply aspect-square;
}
</style>
