<template>
  <roundVersus></roundVersus>
</template>

<script setup>
import RoundVersus from '../components/RoundVersus.vue';
import { ref } from "vue";

const users = ref([
  {
    firstName: "Nicolas",
    victory: "3 victory",
  },
  {
    firstName: "Hugo",
    victory: "1 Victory",
  },
]);
</script>

<style scoped>
.cardContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: absolute;
  transform: translateY(-25%);
}

.imgContainer {
  display: flex;
  justify-content: center;
  margin-top: 25%;
  transform: translateY(-25%);
}
</style>
