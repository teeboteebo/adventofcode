// This is part 2- part 1 is gone

const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .map((string) => string.split("   "));

const solution = () => {
  let totalDiff = 0;
  const leftList =[]
  const rightList =[]
  values.forEach((value) => {
    leftList.push(Number(value[0]))
    rightList.push(Number(value[1]))
  });
  leftList.sort()
  rightList.sort()

  leftList.forEach((value, i) => {
    totalDiff += Math.abs(value - rightList[i]);
  });

  return totalDiff
};
console.log("after", solution());
