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
        'border-solid': winner.name === props.players[1].name,
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
  @apply flex flex-row flex-wrap justify-around items-center;
}
.playerCard {
  @apply flex flex-col justify-around items-center
  transform hover:scale-110 transition
  hover:shadow-2xl
  transform hover:border-2 border-green-500 border-solid
  bg-opacity-20;
}

.playerCard {
  height: 10vh;
  margin: 20px;
}

.logo {
  @apply aspect-square w-3/12;
}

@media (min-width: 1024px) {
  .playerCard {
    height: 20vh;
    @apply transform hover:scale-125 transition;
  }
}

@media (min-width: 1280px) {
  .playerCard {
    height: 20vh;
  }
}
</style>
