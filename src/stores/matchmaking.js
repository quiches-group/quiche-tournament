/*
export const useMatchmaking = defineStore("matchmaking", () => {
  const state = reactive({
    players: [],
    playersRemaining: [],
    rounds: [],
    actualRound: [],
    actualBattle: {},
  });

  const round = reactive({
    list: [],
    new() {},
    next() {},
  });

  function setWinner(player) {
    state.playersRemaining.push(player);
    console.log(state.rounds);
  }

  function createBattle(...playersList) {
    state.rounds[state.actualRound].push({
      id: state.rounds[state.actualRound].length + 1,
      players: playersList,
    });
  }

  function randomChoice() {
    const choice = Math.floor(Math.random() * state.playersRemaining.length);
    const player = state.playersRemaining[choice];
    state.playersRemaining.splice(choice, 1);
    return player;
  }

  function create(playersList) {
    if (!playersList && playersList.length < 2)
      throw new Error("At least two players or teams needed.");
    state.players = playersList;
    state.playersRemaining = state.players;

    state.actualRound = state.rounds.length;
    state.rounds[state.actualRound] = [];

    while (state.playersRemaining.length > 1) {
      createBattle(randomChoice(), randomChoice());
    }

    console.log(state.playersRemaining);
  }

  const { rounds, players } = state;

  return { create, setWinner, rounds, players };
});
*/

/*
const isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;

const nextPowerOfTwo = (x) => {
  if (x < 2) throw new Error("set a number that is more than one");
  let powerOfTwo = 2;
  while (powerOfTwo <= x) {
    powerOfTwo *= 2;
  }
  return powerOfTwo;
};
const beforePowerOfTwo = (x) => nextPowerOfTwo(x) / 2;
*/
