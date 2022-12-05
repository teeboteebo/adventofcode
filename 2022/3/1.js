const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((string) => {
    const firstHalf = string.slice(0, string.length / 2);
    const secondHalf = string.slice(string.length / 2);
    return [firstHalf, secondHalf];
  });

const solution = () => {
  const duplicates = values.map((group) => {
    const [firstHalf, secondHalf] = group;
    const firstHalfSet = new Set(firstHalf);
    const secondHalfSet = new Set(secondHalf);
    const intersection = [...new Set(
      [...firstHalfSet].filter((x) => secondHalfSet.has(x))
    )];
    return intersection.map(x => x[0]);
  });
  

  return duplicates.flat().reduce((acc, curr) => getPriority(curr) + acc, 0);
};

const getPriority = (letter) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = alphabet.toUpperCase();
  const alphabetArray = alphabet.split("");
  const upperAlphabetArray = upperAlphabet.split("");
  const alphabetMap = alphabetArray.reduce((acc, curr, index) => {
    acc[curr] = index + 1;
    return acc;
  }, {});
  const upperAlphabetMap = upperAlphabetArray.reduce((acc, curr, index) => {
    acc[curr] = index + 27;
    return acc;
  }, {});
  const alphabetPriorityMap = { ...alphabetMap, ...upperAlphabetMap };
  return alphabetPriorityMap[letter];
};

console.log(solution());
