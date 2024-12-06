const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat();

const solution = () => {
  return values
    .map((value) => {
      console.log("before", value);
      const numbers = convertToNumbers(value);
      console.log("after", numbers);
      return numbers;
    })
    .reduce((acc, cur) => acc + cur, 0);
};

function convertToNumbers(inputString) {
  const spelledOutNumbers = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  // capture all matches of spelled out numbers
  const regex = /(?=(zero|one|two|three|four|five|six|seven|eight|nine|\d))/gi;
  const matches = Array.from(inputString.matchAll(regex), x => x[1]) 

  const result = matches.map((match) => {
    if (match in spelledOutNumbers) {
      return spelledOutNumbers[match];
    }

    return match;
  });
  // return result;
  const finalNumber = parseInt(`${result[0]}${result[result.length - 1]}`);
  return finalNumber;
}

console.log("after", solution());