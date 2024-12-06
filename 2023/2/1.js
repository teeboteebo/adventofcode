const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat();

// GAME: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'

let game_state = {
  red: 12,
  green: 13,
  blue: 14,
};

const playGame = (sets) => {
  return sets.every((set) => {
    return playSet(set);
  });
};

const playSet = (set) => {
  const colors = Object.keys(set);
  return colors.every((color) => {
    return game_state[color] >= set[color];
  });
};
const solution = () => {
  const games = values.map((game) => {
    const [gameNumber, info] = game.split(": ");
    const number = parseInt(gameNumber.split(" ")[1]);
    const sets = info.split("; ").map((set) => {
      const actions = {};
      set.split(", ").forEach((action) => {
        const [number, color] = action.split(" ");
        actions[color] = parseInt(number);
      });
      return actions;
    });

    return { number, sets };
  });

  const filtered = games.filter((game) => {
    return playGame(game.sets);
  });

  return filtered.reduce((acc, cur) => {
    return acc + cur.number;
  }, 0);
};

console.log(solution());
