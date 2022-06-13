<template>
  <!--
  <q-input placeholder="nom" v-model="player1"></q-input>
-->
  <div class="flex justify-center h-screen">
    <q-dropdown
      placeholder="Nombre de joueur"
      :options="possibleNumberPlayer"
      @select="selectItem"
    ></q-dropdown>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const possibleNumberPlayer = ["2", "3", "4", "5", "6", "7", "8"];
const selectedNumberPlayer = reactive({ number: 2 });
const selectItem = (item) => {
  /* eslint-disable no-console */
  selectedNumberPlayer.number = item;
};
</script>

<style scoped></style>
