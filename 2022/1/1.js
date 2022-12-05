const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"));

const solution = () => {
  const summed = values.map((group) => {
    return group.reduce((acc, curr) => acc + Number(curr), 0);
  });
  return Math.max(...summed);
};

console.log(solution());
