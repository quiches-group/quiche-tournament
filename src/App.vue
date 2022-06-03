<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <q-hello-world class="mt-4" msg="Welcome on Quichify demo !"> </q-hello-world>
</template>
