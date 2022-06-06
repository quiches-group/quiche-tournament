<template>
  <div class="items">
    <div class="flex items-center justify-around">
      <div v-for="player in players" :key="player.id" class="parent">
        <p>
          {{ player.name }}
        </p>
      </div>
      <div class="children">

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  players: {
    type: Array,
    required: true,
  },
});

// TODO: make parents and children classes elements
/**
 * Part du bas avec tous les joueurs
 * Remonte par combats
 * Si joueurs impairs --> un joueur au hasard passe au tour suivant
 */
</script>

<style scoped>
.items {
  @apply bg-green-400;
}

.parent {
  @apply bg-red-400 relative ml-0.5 flex items-center after:content-[''] after:w-24 after:h-1 after:left-0 after:top-1/2 after:bg-black after:translate-x-1;
}

.children {
  @apply bg-blue-400;
}
</style>