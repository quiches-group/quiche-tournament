<template>
  <div class="container">
    <div class="content" v-for="item in dataFaq.data" :key="item.name">
      <h1 class="title">{{ item.name }}</h1>
      <p class="description">{{ item.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive} from "vue";
import faqList from "../assets/faqList.json";


const dataFaq = reactive({
  data: faqList,
});

</script>

<style scoped>
.container {
  @apply flex flex-col items-center m-auto lg:w-9/12 w-11/12;
}

.content {
  @apply flex flex-col w-full items-start;
}

.title {
  @apply text-white text-3xl font-bold mt-8;
}

.description {
  @apply text-white mt-3 break-normal ;
}
</style>
