<template>
  <div>
    <q-row justify="start gap-x-40 gap-y-20 pt-20 px-20">
      <q-col
        :cols="12"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="2"
        v-for="player in playerList"
        :key="player.id"
      >
        <q-card id="card" class="card group will-change-transform">
          <q-card-content>
            <div class="fields-group">
              <q-input
                id="input"
                class="input text-lg font-bold"
                :class="{
                  'border-b-green-500': player.name !== '',
                  'border-b-red-500': player.name === '',
                }"
                backgroundColor="transparent"
                placeholder="Prénom"
                v-model="player.name"
              ></q-input>
              <label class="pl-3 label">Joueur {{ player.id }}</label>
            </div>
          </q-card-content>
        </q-card>
      </q-col>
    </q-row>

    <div class="centered">
    <q-button v-if="playersWereSetted" variant="plain-rounded" size="large" @click="createTournament">
        Créer le tournoi
      </q-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTournaments } from "@/stores/tournaments.js";

const tournament = useTournaments();

const playerList = computed(() => {
  return tournament.playerList;
});

const playersWereSetted = computed(() => {
  const arePlayersSetted = playerList.value.map((player) => {
    return player.name !== "";
  });

  if (playerList.value.length !== 0) {
    return !arePlayersSetted.includes(false);
  }
  return false;
});

function createTournament() {
  const newTournament = tournament.create();
  console.log(newTournament);
}
</script>

<style scoped>
.centered {
  @apply
  flex justify-center pt-10;
}

.card {
  @apply bg-opacity-20
  transform hover:scale-125 transition
  hover:shadow-2xl;
}

.label {
  @apply font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-900;
}

.input {
  @apply bg-opacity-20
  border-b-2 caret-green-600 text-white;
}

.fields-group {
  display: flex;
  flex-direction: column;
}

.fields-group label {
  order: 1;
}

.fields-group .input {
  order: 2;
}
</style>
