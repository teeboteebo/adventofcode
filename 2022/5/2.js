const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n\n")
  .map((string) => string.split("\n"));

const getStartingState = () => {
  const startingPoint = {};
  const rows = values[0].pop();
  const itemRows = values[0];
  rows.split("").forEach((char, i) => {
    if (char === " ") return;

    startingPoint[i] = {
      items: [],
      char,
    };
  });
  itemRows.reverse().forEach((row) => {
    const test = row.split("");
    const validIndexes = Object.keys(startingPoint);
    validIndexes.forEach(
      (index) => test[index] && startingPoint[index].items.push(test[index])
    );
  });
  const pretty = {};
  Object.keys(startingPoint).forEach((key) => {
    pretty[startingPoint[key].char] = startingPoint[key].items.filter(
      (x) => x !== " "
    );
  });

  return pretty;
};

const solution = () => {
  const state = getStartingState();
  const steps = values[1].map((step) => step.split(" "));
  steps.forEach((step) => {
    const [, amt, , from, , to] = step;
    // move amt from from to to in one iteration
    const toMove = state[from].splice(-amt);
    state[to].push(...toMove);

  });


  const lastItems = Object.keys(state).map((key) => state[key].pop());
  return lastItems.join("")
};

console.log(solution());
