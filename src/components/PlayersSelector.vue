<template>
  <div class="centered">
    <p class="text-xl text-white pb-2">Choisis le nombre de joueur :</p>
    <q-dropdown
      class="dropdown"
      accentColor="red"
      placeholder="Nombre de joueur"
      :options="possibleNumberPlayer"
      @select="selectNumberOfPlayer"
    ></q-dropdown>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTournaments } from "@/stores/tournaments.js";

const tournament = useTournaments();

const possibleNumberPlayer = Array.from({ length: 11 }, (_, i) => i + 2);

const playerList = computed(() => {
  return tournament.playerList;
});

const selectNumberOfPlayer = (numberOfPlayer) => {
  for (let i = 1; i <= numberOfPlayer; i += 1) {
    if (playerList.value[i - 1] === undefined) {
      const newPlayer = {
        id: i,
        name: "",
      };
      tournament.addNewPlayer(newPlayer);
    } else if (numberOfPlayer < playerList.value.length) {
      const playersToRemove = playerList.value.length - numberOfPlayer;
      for (let index = 0; index < playersToRemove; index += 1) {
        tournament.popPlayer();
      }
    }
  }
};
</script>

<style scoped>
.centered {
  @apply flex flex-col justify-center pt-10;
}
.dropdown {
  @apply z-50;
}
</style>
