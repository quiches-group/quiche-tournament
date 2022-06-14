<template>
    <div class="cardContainer">
      <q-card class="card" v-for="user in users" :key="user">
        <q-card-title>{{user.firstName}}</q-card-title>
        <q-card-content>{{user.victory}}</q-card-content>
      </q-card>
    </div>
    <div class="imgContainer">
      <img src="../assets/logo.png" alt="">
    </div>
</template>

<script>
import QCard from "@/components/QCard/QCard";
import QCardTitle from "@/components/QCard/QCardTitle";
import QCardContent from "@/components/QCard/QCardContent";

export default {
  name: 'VersusView',
  components: {QCardContent, QCardTitle, QCard},
  data:function() {
    return {
      users: [
        {
          firstName : "Nicolas",
          victory: "3 victory"
        },
        {
          firstName: "Hugo",
          victory: "1 Victory"
        }
      ]
    };
  }
}
</script>

<style scoped lang="scss">
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
