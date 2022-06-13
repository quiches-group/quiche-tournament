<template>
  <!--
  <q-input placeholder="nom" v-model="player1"></q-input>
-->
  <div class="flex justify-center">
    <q-dropdown
      placeholder="Nombre de joueur"
      :options="possibleNumberPlayer"
      @select="selectNumberOfPlayer"
    ></q-dropdown>
  </div>
  <div class="flex justify-center">
    <ul>
      <li class="w-20" v-for="player in playerList" :key="player.id">
        <label>Joueur {{ player.id }}</label>
        <q-input placeholder="Prénom" v-model="player.name"></q-input>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const possibleNumberPlayer = ["2", "3", "4", "5", "6", "7", "8"];

const playerList = ref([]);

const selectNumberOfPlayer = (numberOfPlayer) => {
  for (let i = 1; i <= numberOfPlayer; i += 1) {
    if (playerList.value[i - 1] === undefined) {
      const newPlayer = {
        id: i,
        name: "",
      };
      playerList.value.push(newPlayer);
    } else if (numberOfPlayer < playerList.value.length) {
      const playersToRemove = playerList.value.length - numberOfPlayer;
      for (let i = 0; i < playersToRemove; i += 1) {
        playerList.value.pop();
      }
    }
  }
};
</script>

<style scoped></style>
