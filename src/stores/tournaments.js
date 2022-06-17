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

  function getNumberOfRounds(players) {
    if (players.length === 3) return 2;
    return players.length > 3
      ? Math.log2(getNextPowerOfTwo(players.length)) + 1
      : 1;
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
      id: tournament.rounds.length,
      number: tournament.numberOfRounds - tournament.rounds.length,
      players: tournament.rounds.length === 0 ? tournament.players : [],
      battles: [],
      battle(id) {
        return round.battles[id];
      },
      win(battleId, playerId) {
        // Set winner
        round.battles[battleId].winner = playerId;

        // Get or create nextRound and if it's the semi create final
        let nextRound;
        let final;
        if (tournament.players.length === 3 && round.number === 2) {
          final = tournament.rounds[round.id + 1] ?? createRound(tournamentId);
        }
        if (round.number > 2 && tournament.players.length > 3) {
          nextRound =
            tournament.rounds[round.id + 1] ?? createRound(tournamentId);

          nextRound.players.push(tournament.players[playerId]);
        }
        if (round.number === 3 && tournament.players.length > 3) {
          final =
            tournament.rounds[nextRound.id + 1] ?? createRound(tournamentId);
        }

        if (round.number === 2) {
          tournament.podium.push(
            round.battles[0].players.find(
              (player) => player.id !== round.battles[0].winner
            )
          );
          if (tournament.players.length > 3) {
            tournament.podium.push(tournament.players[round.battles[0].winner]);
          }
        }
        if (round.number === 1) {
          if (tournament.players.length > 2) {
            tournament.podium.push(
              round.battles[0].players.find(
                (player) => player.id !== round.battles[0].winner
              )
            );
          }
          tournament.podium.push(
            round.battles[0].players.find(
              (player) => player.id === round.battles[0].winner
            )
          );
        }

        // Check if all winner are set
        if (round.battles.every((battle) => battle.winner !== null)) {
          if (tournament.players.length === 3 && round.number === 2) {
            final.players.push(tournament.players[playerId]);

            final.battles.push(
              createBattle(tournamentId, final.id, final.players)
            );
          } else if (round.number === 3) {
            const winners = round.battles.map(
              (battle) => tournament.players[battle.winner]
            );
            const losers = round.battles.map((battle) =>
              battle.players.find((player) => player.id !== battle.winner)
            );

            nextRound.players = losers;
            // Create and push each battles in the next round
            nextRound.battles.push(
              createBattle(tournamentId, nextRound.id, losers)
            );
            final.players = winners;
            final.battles.push(createBattle(tournamentId, final.id, winners));
          } else if (round.number > 2) {
            // Start a matchmaking between players
            const { battles, playersTmp } = matchmaking(nextRound.players);

            // If playersTmp is not empty
            if (playersTmp.length > 0) {
              // Send playersTmp in the second next round
              const secondNextRound =
                tournament.rounds[nextRound.id + 1] ??
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
          }

          if (round.number > 1) {
            // Add one to the round
            tournament.actualRound += 1;
          }
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
      numberOfRounds: getNumberOfRounds(players),
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

    if (playersTmp.length > 0) {
      const nextRound = createRound(tournament.id);
      playersTmp.forEach((player) => nextRound.players.push(player));
    }

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
