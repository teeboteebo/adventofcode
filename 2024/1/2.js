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
  let similarityScore = 0;
  const leftList =[]
  const rightList =[]
  values.forEach((value) => {
    leftList.push(Number(value[0]))
    rightList.push(Number(value[1]))
  });

  leftList.forEach((leftListValue, i) => {
    const totalAmountOfRightValue = rightList.filter((value) => value === leftListValue).length
    similarityScore += leftListValue * totalAmountOfRightValue
  });

  return similarityScore
};
console.log("after", solution());
