<template>
  <div>
    <q-row class="row" justify="center">
      <q-col
        class="col"
        :cols="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
        v-for="player in playerList"
        :key="player.id"
      >
        <q-card id="card" class="card group will-change-transform">
          <q-card-content>
            <div class="fields-group w-full">
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
      <q-button
        v-if="playerList.length !== 0"
        :loading="isGettingRandomName"
        variant="plain-rounded"
        size="large"
        @click="getUsers"
      >
        Noms aléatoires
      </q-button>
    </div>

    <div class="centered">
      <q-button
        v-if="playersWereSetted"
        variant="plain-rounded"
        size="large"
        @click="createTournament"
      >
        Créer le tournoi
      </q-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useTournaments } from "@/stores/tournaments.js";

const tournaments = useTournaments();
const router = useRouter();
const isGettingRandomName = ref(false);

const playerList = computed(() => {
  return tournaments.playerList;
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
  const tournament = tournaments.create();
  router.push({
    name: "tournament",
    params: { tournamentId: tournament.id },
  });
}

async function getUsers() {
  isGettingRandomName.value = true;
  await Promise.all(
    playerList.value.map(async (player) => {
      const res = await fetch("https://randomuser.me/api/");
      const { results } = await res.json();
      player.name = results[0].name.first;
    })
  );
  isGettingRandomName.value = false;
}
</script>

<style scoped>
.centered {
  @apply flex justify-center
  pt-10;
}

.card {
  @apply bg-opacity-20
  transform hover:scale-125 transition
  hover:shadow-2xl
  w-full;
}

.label {
  @apply font-extrabold text-white;
}

.input {
  @apply bg-opacity-20
  border-b-2 caret-green-600 text-white;
}

.fields-group {
  @apply flex flex-col;
}

.fields-group label {
  @apply order-1;
}

.fields-group .input {
  @apply order-2;
}

.row {
  @apply m-0
  lg:max-w-2xl
  xl:max-w-3xl;
}

.col {
  @apply py-3
  lg:px-3
  sm:px-2;
}
</style>
