<template>
  <div class="container">
    <div class="btn-container">
      <q-button class="faq-btn" :default-positionning="false" @click="$router.back()">Accueil</q-button>
    </div>
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

.btn-container {
  @apply flex w-full md:justify-start justify-center;
}

.faq-btn {
  @apply mt-5 relative before:content-[''] before:relative before:mr-1.5;
}

/* arrow style*/
.faq-btn:before{
  @apply block w-2.5 h-2.5 p-0 border-t-2 border-l-2 border-solid border-white origin-center -rotate-45 ease-out duration-300;
}

.faq-btn:hover:before{
  @apply mr-4;
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
