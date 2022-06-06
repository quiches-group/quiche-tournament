import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMatchmaking = defineStore("matchmaking", () => {
  const state = reactive({
    players: [
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
    ],
    playersRemaining: [],
    battles: [],
  });

  function setWinner(player) {
    state.playersRemaining.push(player);
  }

  function createBattle(round, ...playersList) {
    state.battles[round].push({
      id: state.battles.length + 1,
      players: playersList,
    });
  }

  function randomChoice() {
    const choice = Math.floor(Math.random() * state.playersRemaining.length);
    const player = state.playersRemaining[choice];
    state.playersRemaining.splice(choice, 1);
    return player;
  }

  function create(playersList = undefined) {
    if (playersList) {
      state.players = playersList;
    }
    state.playersRemaining = state.players;

    const round = state.battles.length;
    state.battles[round] = [];

    while (state.playersRemaining.length > 1) {
      createBattle(round, randomChoice(), randomChoice());
    }

    console.log(state.playersRemaining);
  }

  const { battles, players } = state;

  return { create, setWinner, battles, players };
});
