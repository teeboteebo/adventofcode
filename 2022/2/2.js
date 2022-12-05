const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat();

const solution = () => {
  // A beats C
  // C beats B
  // B beats A
  const opponentDraws = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
  };
  const responses = {
    Y: "Draw",
    X: "Loss",
    Z: "Win",
  };
  const points = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
  };
  const resultPoints = {
    Loss: 0,
    Draw: 3,
    Win: 6,
  };
  const rules = {
    Rock: {
      Draw: "Rock",
      Win: "Paper",
      Loss: "Scissors",
    },
    Paper: {
      Loss: "Rock",
      Draw: "Paper",
      Win: "Scissors",
    },
    Scissors: {
      Win: "Rock",
      Loss: "Paper",
      Draw: "Scissors",
    },
  };


  const rounds = values.map((group) => {
    const [him, res] = group.split(" ");
    return { him: opponentDraws[him], result: responses[res] };
  });

  // calculate round results
  const results = rounds.map((round) => {
    const { him, result } = round;
    const me = rules[him][result];
    const selectionPoints = points[me];
    return resultPoints[result] + selectionPoints;
  });

  // return the sum of the results
  return results.reduce((acc, curr) => acc + curr, 0);
};

console.log(solution());
