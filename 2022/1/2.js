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
  const [one, two, three] = summed.sort((a, b) => b - a).splice(0, 3);

  return one + two + three;
};

console.log(solution());