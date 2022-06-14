<template>
  <div class="centered">
    <q-dropdown
      accentColor="red"
      placeholder="Nombre de joueur"
      :options="possibleNumberPlayer"
      @select="selectNumberOfPlayer"
    ></q-dropdown>
  </div>
</template>

<script setup>
import { useTournaments } from "@/stores/tournaments.js";
import { computed } from "vue";

const tournament = useTournaments();

const possibleNumberPlayer = ["2", "3", "4", "5", "6", "7", "8"];

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
  @apply flex justify-center pt-10;
}
</style>
