const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")

const solution = () => {
  // batch the lines with 3 lines each
  const groups = values.reduce((acc, curr) => {
    if (acc[acc.length - 1].length === 3) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }
  , [[]]);

  // find duplicates within each group and return the character
  const duplicates = groups.map((group) => {
    const [first, second, third] = group;
    const firstSet = new Set(first);
    const secondSet = new Set(second);
    const thirdSet = new Set(third);
    const intersection = [...new Set(
      [...firstSet].filter((x) => secondSet.has(x) && thirdSet.has(x))
    )];
    return intersection.map(x => x[0]);
  }
  );

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
