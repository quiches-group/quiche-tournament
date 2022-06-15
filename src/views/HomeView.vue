<template>
  <div class="myContainer">
    <div class="side left">
      <img class="logo" src="../assets/vsLogo.png" alt="Versus logo">
      <player-selector class="selector"></player-selector>
      <span></span>
    </div>
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
.myContainer {
  @apply flex flex-col lg:flex-row min-h-screen w-screen p-5;
}

.left {
  @apply flex flex-1 w-full flex-col flex-wrap items-center
  my-20 lg:justify-between justify-start;
}

.right {
  @apply my-20;
}

.logo {
  @apply aspect-square;
}
</style>
