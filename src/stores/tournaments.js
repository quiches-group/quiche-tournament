import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

// - [x] TODO: Make tournaments.create(players) the only function to create a tournament, a round and a matchmaking
// - [x] TODO: Make that the last win of a round launch a new round and matchmaking
// - [x] TODO: Check if there's only two players and if it is don't create a new round
// - [ ] TODO: Make the battle of the loser of the semi final to set the 4th and 3rd player
// - [ ] TODO: Set the 1st, 2nd, 3rd and 4th players in a list (array or object)

export const useTournaments = defineStore("tournaments", () => {
  /* State */

  const state = reactive({
    list: [],
    get(id) {
      return state.list[id];
    },
  });

  /* Player of new tournament */

  const playerList = ref([]);

  function addNewPlayer(newPlayer) {
    playerList.value.push(newPlayer);
  }

  function popPlayer() {
    playerList.value.pop();
  }

  /* Tournament */

  // region Tournament
  function getNextPowerOfTwo(number) {
    return Math.log2(number) % 1 === 0 ? number : getNextPowerOfTwo(number + 1);
  }

  function matchmaking(players) {
    const battles = [];
    let nbPlayers;
    if (Math.log2(players.length) % 1 !== 0) {
      const nextPowerOfTwo = getNextPowerOfTwo(players.length);
      const difference = nextPowerOfTwo - players.length;
      nbPlayers = players.length - difference;
    } else {
      nbPlayers = players.length;
    }

    const playersTmp = [...players];
    for (let i = 0; i < Math.floor(nbPlayers / 2); i += 1) {
      const battle = [];
      for (let j = 0; j < 2; j += 1) {
        const choice = Math.floor(Math.random() * playersTmp.length);
        battle.push(playersTmp[choice]);
        playersTmp.splice(choice, 1);
      }
      battles.push(battle);
    }

    return {
      battles,
      playersTmp,
    };
  }

  function createBattle(tournamentId, battle) {
    return {
      id: state.get(tournamentId).round(state.get(tournamentId).actualRound)
        .battles.length,
      players: battle,
      winner: null,
    };
  }

  function createRound(tournamentId) {
    const round = {
      id: state.get(tournamentId).rounds.length ?? 0,
      players:
        state.get(tournamentId).rounds.length === 0
          ? state.get(tournamentId).players
          : [],
      battles: [],
      battle(id) {
        return round.battles[id];
      },
      win(battleId, playerId) {
        round.battle(battleId).winner =
          state.get(tournamentId).players[playerId];
        const nextRound =
          state.get(tournamentId).round(round.id + 1) ??
          createRound(tournamentId);
        nextRound.players.push(state.get(tournamentId).players[playerId]);

        if (
          nextRound.players.length ===
          getNextPowerOfTwo(round.players.length) / 2
        ) {
          const { battles, playersTmp } = matchmaking(round.players);
          battles.forEach((battle) =>
            round.battles.push(createBattle(tournamentId, battle))
          );

          const futureRound = createRound(tournamentId);
          playersTmp.forEach((player) => futureRound.players.push(player));

          round.players = round.players.filter(
            (player) => !playersTmp.includes(player)
          );

          state.get(tournamentId).actualRound += 1;
        }
        console.log(state.get(tournamentId));
      },
    };

    state.get(tournamentId).rounds.push(round);
    return round;
  }

  function create(players) {
    if (!players) throw new Error("We need a list of players");
    const tournament = {
      id: state.list.length,
      players,
      actualRound: 0,
      rounds: [],
      round(id) {
        return tournament.rounds[id];
      },
    };

    state.list.push(tournament);

    const round = createRound(tournament.id);
    const { battles, playersTmp } = matchmaking(round.players);
    battles.forEach((battle) =>
      round.battles.push(createBattle(tournament.id, battle))
    );

    const nextRound = createRound(tournament.id);
    playersTmp.forEach((player) => nextRound.players.push(player));

    round.players = round.players.filter(
      (player) => !playersTmp.includes(player)
    );

    return tournament;
  }

  const { get, list } = state;

  return {
    playerList,
    addNewPlayer,
    popPlayer,
    list,
    get,
    create,
  };
});
