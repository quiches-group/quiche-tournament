import { defineStore } from "pinia";
import { reactive } from "vue";

export const useTournaments = defineStore("tournaments", () => {
  const state = reactive({
    list: [],
    get(id) {
      return state.list[id];
    },
  });

  // region Tournament
  function create(players) {
    const tournament = {
      id: state.list.length,
      players: [],
      actualRound: 0,
      rounds: [],
      round(id) {
        return tournament.rounds[id];
      },
    };

    state.list.push(tournament);
    state.list[tournament.id].players = players;

    return state.list[tournament.id];
  }

  function createRound(tournamentId) {
    const round = {
      id: state.get(tournamentId).rounds.length,
      players: [],
      battles: [],
      battle(id) {
        return round.battles[id];
      },
    };

    state.get(tournamentId).rounds.push(round);
    if (round.id === 0)
      state.list[tournamentId].rounds[round.id].players =
        state.get(tournamentId).players;

    return state.list[tournamentId].rounds[round.id];
  }

  function createBattle(tournamentId, roundId, players) {
    const battle = {
      id: state.get(tournamentId).round(roundId).battles.length,
      players: [],
      winner: null,
      win(playerId) {
        battle.winner = playerId;
        const nextRound =
          state.get(tournamentId).round(roundId + 1) ??
          createRound(tournamentId);
        nextRound.players.push(state.get(tournamentId).players[playerId]);
      },
    };

    state.get(tournamentId).round(roundId).battles.push(battle);
    state.list[tournamentId].rounds[roundId].battles[battle.id].players =
      players;

    console.log(state.list[tournamentId].rounds[roundId].battles);

    return state.list[tournamentId].rounds[roundId].battles[battle.id];
  }

  // endregion

  // region Matchmaking

  function roundMatchmaking(tournamentId, roundId) {
    const round = state.get(tournamentId).round(roundId);

    const { players } = round;
    if (Math.log2(players.length) % 1 !== 0) {
      const nextPowerOfTwo = (x) => (Math.log2(x) % 1 !== 0 ? x : x + 1);
      const next = nextPowerOfTwo(players.length);

      const difference = next - players.length;
      const nbPlayersInRound = players.length - difference;
      const playersTmp = [];
      playersTmp.push(...players);
      for (let i = 0; i < Math.floor(nbPlayersInRound / 2); i += 1) {
        const playersInBattle = [];
        for (let j = 0; j < 2; j += 1) {
          const choice = Math.floor(Math.random() * playersTmp.length);
          playersInBattle.push(playersTmp[choice]);
          playersTmp.splice(choice, 1);
        }

        createBattle(tournamentId, roundId, playersInBattle);
      }
      const nextRound =
        state.get(tournamentId).round(roundId + 1) ?? createRound(tournamentId);
      nextRound.players.push(...playersTmp);
    }

    round.battles = [];
  }

  // endregion

  const { get, list } = state;

  return {
    list,
    create,
    get,
    createRound,
    createBattle,
    roundMatchmaking,
  };
});
