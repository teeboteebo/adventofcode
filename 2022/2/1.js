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
    Y: "Paper",
    X: "Rock",
    Z: "Scissors",
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

  const rounds = values.map((group) => {
    const [him, me] = group.split(" ");
    return { him: opponentDraws[him], me: responses[me] };
  });

  // calculate round results
  const results = rounds.map((round) => {
    const { him, me } = round;
    const selectionPoints = points[me];
    const win = resultPoints.Win + selectionPoints;
    const draw = resultPoints.Draw + selectionPoints;
    const loss = resultPoints.Loss + selectionPoints;

    if (him === me) {
      return draw;
    }
    if (him === "Rock" && me === "Paper") {
      return win;
    }
    if (him === "Rock" && me === "Scissors") {
      return loss;
    }
    if (him === "Paper" && me === "Rock") {
      return loss;
    }
    if (him === "Paper" && me === "Scissors") {
      return win;
    }
    if (him === "Scissors" && me === "Rock") {
      return win;
    }
    if (him === "Scissors" && me === "Paper") {
      return loss;
    }
  });
  // return the sum of the results
  return results.reduce((acc, curr) => acc + curr, 0);
};

console.log(solution());
