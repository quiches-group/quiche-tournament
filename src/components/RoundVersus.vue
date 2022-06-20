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
      <span></span>
    </q-card>

    <img class="logo" src="../assets/vsLogo.png" alt="Versus logo" />

    <q-card
      class="playerCard"
      :class="{
        'border-4': winner.name === props.players[1].name,
        'border-solid': winner.name === props.players[1].name,
      }"
      @click="choose(props.players[1])"
    >
      <q-card-title>{{ props.players[1].name }}</q-card-title>
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
  id: undefined,
  name: undefined,
  victory: undefined,
});

const choose = (player) => {
  if (winner.name !== player.name) {
    winner.id = player.id;
    winner.name = player.name;
    winner.victory = player.victory;
  } else {
    winner.id = undefined;
    winner.name = undefined;
    winner.victory = undefined;
  }

  emit("winner", winner);
};
</script>

<style scoped>
.round {
  @apply flex flex-col xl:flex-row flex-wrap justify-around items-center space-y-10;
}
.playerCard {
  @apply flex flex-col justify-center items-center
  transform hover:scale-110 transition
  hover:shadow-2xl
  transform hover:border-2 border-green-500 border-solid
  bg-opacity-20
  w-4/6 sm:w-2/6;
}

.playerCard {
  height: 10vh;
}

.logo {
  @apply aspect-square w-3/12;
}
</style>
