import { defineStore } from "pinia";
import { reactive } from "vue";

export const useTournaments = defineStore("tournaments", () => {
  const state = reactive({
    list: [],
  });

  function create(players) {
    const tournament = {
      id: state.list.length,
      players,
      actualRound: 0,
      round: [],
    };

    state.list.push(tournament);
    return tournament;
  }

  function createRound(tournamentId) {
    const round = {
      id: state.list[tournamentId].length,
      players: [],
      battles: [],
    };

    function nextPowerOfTwo(x) {
      return Math.log2(x) % 1 === 0 ? x : nextPowerOfTwo(x + 1);
    }

    if (round.id === 0) {
      round.players = state.list[tournamentId].players;

      if (Math.log2(round.players.length) % 1 !== 0) {
        const powerOfTwo = nextPowerOfTwo(round.players.length);
        const difference = powerOfTwo - round.players.length;

        for (let i = 0; i < difference; i += 1) {
          const test = round.players[Math.random() * i];
        }
      }
    }

    state.list[tournamentId].round.push(round);
    return round;
  }

  function createBattle(tournamentId, roundId, ...players) {
    const battle = {
      id: state.list[tournamentId].round[roundId].battles.length,
      players,
      winner: null,
    };

    state.list[tournamentId].round[roundId].battles.push(battle);
    return battle;
  }

  function winBattle() {}

  const { list } = state;

  return { list, create, createRound, createBattle, winBattle };
});
