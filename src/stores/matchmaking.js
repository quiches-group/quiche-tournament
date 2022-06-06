import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchmaking = defineStore("matchmaking", () => {
  const players = [
    {
      id: 1,
      name: "Player 1",
    },
    {
      id: 2,
      name: "Player 2",
    },
    {
      id: 3,
      name: "Player 3",
    },
    {
      id: 4,
      name: "Player 4",
    },
    {
      id: 5,
      name: "Player 5",
    },
    {
      id: 6,
      name: "Player 6",
    },
    {
      id: 7,
      name: "Player 7",
    },
    {
      id: 8,
      name: "Player 8",
    },
  ];

  const remainingPlayers = [...players];

  const battles = ref([]);

  function get() {
    return battles.value;
  }

  function createBattle(...playersList) {
    battles.value.push({
      id: battles.value.length + 1,
      players: playersList,
    });
  }

  function randomChoice() {
    const choice = Math.floor(Math.random() * remainingPlayers.length);
    const player = remainingPlayers[choice];
    remainingPlayers.splice(choice, 1);
    return player;
  }

  function create() {
    if (remainingPlayers.length % 2 === 0) {
      while (remainingPlayers.length > 0) {
        console.log(remainingPlayers.length);
        createBattle(randomChoice(), randomChoice());
      }
    }
  }

  return { get, create };
});
