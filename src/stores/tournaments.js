import { defineStore } from "pinia";
import { reactive } from "vue";

// - [x] TODO: Make tournaments.create(players) the only function to create a tournament, a round and a matchmaking
// - [x] TODO: Make that the last win of a round launch a new round and matchmaking
// - [x] TODO: Check if there's only two players and if it is don't create a new round
// - [ ] TODO: Make the battle of the loser of the semi final to set the 4th and 3rd player
// - [ ] TODO: Set the 1st, 2nd, 3rd and 4th players in a list (array or object)

export const useTournaments = defineStore("tournaments", () => {
  const state = reactive({
    list: [],
    get(id) {
      return state.list[id];
    },
  });

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

  function createBattle(tournamentId, players) {
    const battle = {
      id: state.get(tournamentId).round(state.get(tournamentId).actualRound)
        .battles.length,
      players: [],
      winner: null,
      win(playerId) {
        battle.winner = playerId;
        if (
          state.get(tournamentId).round(state.get(tournamentId).actualRound)
            .players.length > 2
        ) {
          const nextRound =
            state
              .get(tournamentId)
              .round(state.get(tournamentId).actualRound + 1) ??
            createRound(tournamentId);
          nextRound.players.push(state.get(tournamentId).players[playerId]);
          if (
            battle.id ===
            state.get(tournamentId).round(state.get(tournamentId).actualRound)
              .battles.length -
              1
          ) {
            if (
              state.get(tournamentId).round(state.get(tournamentId).actualRound)
                .players.length === 4
            ) {
              const thirdPlacePlayers = state
                .get(tournamentId)
                .round(state.get(tournamentId).actualRound)
                .players.filter(
                  (player) => !nextRound.players.includes(player)
                );
            }
            state.get(tournamentId).actualRound += 1;
          }
        }
      },
    };

    state
      .get(tournamentId)
      .round(state.get(tournamentId).actualRound)
      .battles.push(battle);

    state.list[tournamentId].rounds[
      state.get(tournamentId).actualRound
    ].battles[battle.id].players = players;

    return state.list[tournamentId].rounds[state.get(tournamentId).actualRound]
      .battles[battle.id];
  }

  function roundMatchmaking(tournamentId) {
    // Get the round
    const round = state
      .get(tournamentId)
      .round(state.get(tournamentId).actualRound);

    const { players } = round;
    let nbPlayersInRound;

    // Check if number of players is a power of 2
    if (Math.log2(players.length) % 1 !== 0) {
      // If it's not get the next power of 2
      const nextPowerOfTwo = (x) =>
        Math.log2(x) % 1 === 0 ? x : nextPowerOfTwo(x + 1);
      const next = nextPowerOfTwo(players.length);

      // Get the difference between the number of players and the next power of 2
      const difference = next - players.length;

      // Get the number of players in the actual round to have a power of 2 the next round
      nbPlayersInRound = players.length - difference;
    } else {
      // If the number of players is a power of two let the actual number of players be the number of players in the round
      nbPlayersInRound = players.length;
    }

    // Set a temp var for the players
    const playersTmp = [];
    playersTmp.push(...players);
    for (let i = 0; i < Math.floor(nbPlayersInRound / 2); i += 1) {
      // Set a var to save the players in a battle
      const playersInBattle = [];
      for (let j = 0; j < 2; j += 1) {
        // Make a random choice in the list
        const choice = Math.floor(Math.random() * playersTmp.length);

        // Save the actual choice in the var
        playersInBattle.push(playersTmp[choice]);

        // Remove the choice in the temp var of players
        playersTmp.splice(choice, 1);
      }

      // Create a battle with the chosen players
      createBattle(tournamentId, playersInBattle);
    }

    if (playersTmp.length > 0) {
      round.players = round.players.filter(
        (player) => !playersTmp.includes(player)
      );
      const nextRound =
        state
          .get(tournamentId)
          .round(state.get(tournamentId).actualRound + 1) ??
        createRound(tournamentId);
      nextRound.players.push(...playersTmp);
    }
  }

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

    if (state.list[tournament.id].rounds.length === 0) {
      const round = createRound(tournament.id);
      roundMatchmaking(tournament.id, round.id);
    }

    return state.list[tournament.id];
  }

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
