// This is part 2- part 1 is gone

const fs = require("fs");
const string = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .join();

const solution = () => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/gm;
  const matches = string.match(regex);

  const values = matches.map((match) => {
    return match.slice(4, -1).split(",").map(Number);
  });

  const sumOfValues = values.reduce((acc, value) => {
    return acc + value[0] * value[1];
  }, 0);

  return sumOfValues;
};

console.log("after", solution());
