<template>
  <div class="tournamentCreator">
    <div class="side left">
      <img class="logo" src="../assets/vsLogo.png" alt="Versus logo" />
      <player-selector class="selector"></player-selector>
      <span></span>
    </div>
    <q-button class="faqBtn" :default-positionning="false" @click="$router.push('faq')" >FAQ</q-button>
    <div class="right">
      <player-creator class="creator"></player-creator>
    </div>
  </div>
</template>

<script setup>
import PlayerCreator from "../components/PlayersCreator.vue";
import PlayerSelector from "../components/PlayersSelector.vue";
</script>

<style scoped>
.tournamentCreator {
  @apply flex flex-col lg:flex-row;
}

.left {
  @apply flex flex-1 w-full flex-col flex-wrap items-center
  my-20 lg:justify-start justify-start;
}

.right {
  @apply my-20;
}

.logo {
  @apply aspect-square w-3/12;
}
.faqBtn {
  position: absolute !important;
  @apply flex m-8;
}
</style>
