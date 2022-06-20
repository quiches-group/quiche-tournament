<template>
  <q-carousel>
    <q-carousel-item v-for="tournament in allTournaments" :key="tournament.id">
      <div>
        {{ tournament.name }}
      </div>
    </q-carousel-item>
  </q-carousel>
</template>

<script setup>
import { computed } from "vue";
import { useTournaments } from "@/stores/tournaments.js";

const tournaments = useTournaments();
const allTournaments = computed(() => {
  return tournaments.list;
});

</script>

<style scoped>

</style>
