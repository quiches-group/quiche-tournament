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
  function createPlayers(players) {
    return players.map((player, id) => {
      return {
        id,
        name: player,
      };
    });
  }

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

  function createBattle(tournamentId, roundId, battle) {
    return {
      id: state.get(tournamentId).round(roundId).battles.length,
      players: battle,
      winner: null,
    };
  }

  function createRound(tournamentId) {
    const tournament = state.get(tournamentId);

    const round = {
      id: tournament.rounds.length ?? 0,
      players: tournament.rounds.length === 0 ? tournament.players : [],
      battles: [],
      battle(id) {
        return round.battles[id];
      },
      win(battleId, playerId) {
        // Set winner
        tournament.rounds[round.id].battles[battleId].winner = playerId;

        // Get or create nextRound
        const nextRound =
          state.list[tournamentId].rounds[round.id + 1] ??
          createRound(tournamentId);

        // Set players of next round
        nextRound.players.push(state.list[tournamentId].players[playerId]);

        // Check if all winner are set
        if (round.battles.every((battle) => battle.winner !== null)) {
          // set the podium
          if (nextRound.players.length < 2) {
            // get last round players :
            state.list[tournamentId].podium.push(
              state.list[tournamentId].players[round.battles[0].winner]
            );
            state.list[tournamentId].podium.push(
              round.players.filter(
                (player) => !state.list[tournamentId].podium.includes(player)
              )
            );

            if (state.list[tournamentId].players.length === 3) {
              state.list[tournamentId].podium.push(
                ...state.list[tournamentId].players.filter(
                  (player) => !state.list[tournamentId].podium.includes(player)
                )
              );
              return;
            }
            if (state.list[tournamentId].players.length > 3) {
              return;
            }
          }

          if (round.players.length === 2 && nextRound.players.length < 2) {
            state.list[tournamentId].podium.push(nextRound.players[0]);
            state.list[tournamentId].podium.push(
              ...round.players.filter(
                (player) => !nextRound.players.includes(player)
              )
            );
            // state.list;
            return;
          }

          // If it's the semi (4 players in this round)
          if (round.players.length > 2 && nextRound.players.length === 2) {
            const losers = round.players.filter(
              (player) => !nextRound.players.includes(player)
            );

            // creation de la finale
            const final =
              state.list[tournamentId].rounds[round.id + 1] ??
              createRound(tournamentId);

            // copy the nextRound in the final
            final.players.push(...nextRound.players);

            // set nextRound players to be the third battle
            nextRound.players = [];
            nextRound.players.push(...losers);

            const battles = [[...nextRound.players], [...losers]];

            losers.forEach((loser) => {
              nextRound.players.push(
                state.list[tournamentId].players[
                  state.list[tournamentId].players.findIndex(
                    (player) => player === loser
                  )
                ]
              );
            });

            // Create and push each battles in the next round
            battles.forEach((battle) => {
              nextRound.battles.push(
                createBattle(tournamentId, nextRound.id, battle)
              );
            });

            // Add one to the round
            state.list[tournamentId].actualRound += 1;

            return;
          }

          // Start a matchmaking between players
          const { battles, playersTmp } = matchmaking(nextRound.players);

          // If playersTmp is not empty
          if (playersTmp.length > 0) {
            // Send playersTmp in the second next round
            const secondNextRound =
              state.list[tournamentId].rounds[nextRound.id + 1] ??
              createRound(tournamentId);
            // Add playersTmp to second next run
            secondNextRound.players.push(...playersTmp);
          }

          // Create and push each battles in the next round
          battles.forEach((battle) => {
            nextRound.battles.push(
              createBattle(tournamentId, nextRound.id, battle)
            );
          });

          // Add one to the round
          state.list[tournamentId].actualRound += 1;
        }
      },
    };

    state.get(tournamentId).rounds.push(round);
    return round;
  }

  function create(players) {
    if (!players) throw new Error("We need a list of players");
    const tournament = {
      id: state.list.length,
      players: createPlayers(players),
      actualRound: 0,
      rounds: [],
      podium: [],
      round(id) {
        return tournament.rounds[id];
      },
    };

    state.list.push(tournament);

    const round = createRound(tournament.id);
    const { battles, playersTmp } = matchmaking(round.players);
    battles.forEach((battle) =>
      round.battles.push(createBattle(tournament.id, round.id, battle))
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
