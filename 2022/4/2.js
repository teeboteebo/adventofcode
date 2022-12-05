const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((string) => string.split(","));

const solution = () => {
  return values.filter((pair) => {
    const [elf1, elf2] = pair.map((elf) => elf.split("-").map(Number));

    const [elf1Start, elf1End] = elf1;
    const [elf2Start, elf2End] = elf2;

    // return true if there is any overlap
    return (
      (elf1Start >= elf2Start && elf1Start <= elf2End) ||
      (elf1End >= elf2Start && elf1End <= elf2End) ||
      (elf2Start >= elf1Start && elf2Start <= elf1End) ||
      (elf2End >= elf1Start && elf2End <= elf1End)
    );

  }).length;
};

console.log(solution());
