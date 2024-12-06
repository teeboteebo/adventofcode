const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat();

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

  const gamesWithMaxVals = games.map((game) => {
    const maxVals = { red: 0, green: 0, blue: 0 };

    game.sets.forEach((set) => {
      if (set.red > maxVals.red) {
        maxVals.red = set.red;
      }
      if (set.green > maxVals.green) {
        maxVals.green = set.green;
      }
      if (set.blue > maxVals.blue) {
        maxVals.blue = set.blue;
      }
    });

    return { ...game, maxVals };
  });

  return gamesWithMaxVals.reduce((acc, cur) => {
    const product = cur.maxVals.red * cur.maxVals.green * cur.maxVals.blue;
    return acc + product;
  }, 0);
};

console.log(solution());