import { defineStore } from "pinia";
import { reactive, ref } from "vue";

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
        name: player.name,
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
      id: state.get(tournamentId).rounds[roundId].battles.length,
      players: battle,
      winner: null,
    };
  }

  function createRound(tournamentId) {
    const tournament = state.get(tournamentId);

    const round = {
      id: tournament.rounds.length,
      name: "",
      number: tournament.numberOfRounds - tournament.rounds.length,
      players: tournament.rounds.length === 0 ? tournament.players : [],
      battles: [],
      actualBattleIndex: 0,
      actualBattle() {
        return ref(round.battles[this.actualBattleIndex]);
      },
      win(battleId, playerId) {
        // Set winner
        if (playerId === undefined) return;

        round.battles[battleId].winner = playerId;

        // region Get or create round
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
        // endregion

        // region Move to nextBattle if there is one
        if (this.actualBattleIndex < this.battles.length - 1) {
          this.actualBattleIndex += 1;
          return;
        }
        // endregion

        // region Set podium in the two last round (there is only one battle in each)
        // region Set podium
        if (tournament.podium.includes(tournament.players[playerId])) {
          return;
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
          tournament.podium.push(
            round.battles[0].players.find(
              (player) => player.id !== round.battles[0].winner
            )
          );
          tournament.podium.push(
            round.battles[0].players.find(
              (player) => player.id === round.battles[0].winner
            )
          );
          tournament.podium.reverse();
        }
        // endregion

        // region Set winners battle
        if (round.number > 1) {
          // Add one to the round
          tournament.actualRoundIndex += 1;
        }

        if (tournament.players.length === 3 && round.number === 2) {
          final.players.push(tournament.players[playerId]);

          final.battles.push(
            createBattle(tournamentId, final.id, final.players)
          );
          return;
        }
        if (round.number === 3) {
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
          return;
        }
        if (round.number > 2) {
          // Start a matchmaking between players
          const { battles, playersTmp } = matchmaking(nextRound.players);

          // If playersTmp is not empty
          if (playersTmp.length > 0) {
            // Send playersTmp in the second next round
            const secondNextRound =
              tournament.rounds[nextRound.id + 1] ?? createRound(tournamentId);
            // Add playersTmp to second next run
            secondNextRound.players.push(...playersTmp);
          }

          // Create and push each battles in the next round
          battles.forEach((battle) => {
            nextRound.battles.push(
              createBattle(tournamentId, nextRound.id, battle)
            );
          });

          this.actualBattleIndex = 0;
        }
        // endregion
        // endregion
      },
    };

    switch (round.number) {
      case 1:
        round.name = "Finale";
        break;
      case 2:
        round.name = "Troisième place";
        break;
      case 3:
        round.name = "Demi-finale";
        break;
      case 4:
        round.name = "Quart de finale";
        break;
      case 5:
        round.name = "Huitième de finale";
        break;
      default:
        round.name = "";
    }

    state.get(tournamentId).rounds.push(round);
    return round;
  }

  function create() {
    if (!playerList.value) throw new Error("We need a list of players");
    const tournament = {
      id: state.list.length,
      players: createPlayers(playerList.value),
      numberOfRounds: getNumberOfRounds(playerList.value),
      actualRoundIndex: 0,
      rounds: [],
      podium: [],
      actualRound() {
        return ref(tournament.rounds[this.actualRoundIndex]);
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
