const fs = require("fs");
const { get } = require("http");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .map((string) => string.split(""));

// const values =
// [
//   ['4','6','7','.','.','1','1','4','.','.'],
//   ['.','.','.','*','.','.','.','.','.','.']
// ]

const isSymbol = (value) => {
  return !!value && value !== "." && Number.isNaN(Number(value));
};

const getNeighbors = (row, column) => {
  const neighbors = [];

  // Define relative positions of neighbors (top, bottom, left, right, diagonals)
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const dir of directions) {
    const newRow = row + dir[0];
    const newCol = column + dir[1];

    // Check if the new coordinates are within bounds
    if (values?.[newRow]?.[newCol] !== undefined) {
      neighbors.push(values[newRow][newCol]);
    }
  }

  return neighbors;
};

const solution = () => {
  const validNumbers = [];

  values.forEach((row, i) => {
    let number = "";
    let hasAdjacentSymbol = false;

    row.forEach((column, j) => {
      const currVal = column;
      let isNumber = !Number.isNaN(Number(currVal));

      if (isNumber) {
        number += currVal;
        if (getNeighbors(i, j).some((val) => isSymbol(val))) {
          hasAdjacentSymbol = true;
        }
      }

      if (!isNumber || j === row.length - 1) {
        if (hasAdjacentSymbol) {
          validNumbers.push(Number(number));
          number = "";
          hasAdjacentSymbol = false;
        } else {
          number = "";
        }
      }
    });

  });

  return validNumbers.reduce((acc, cur) => acc + cur, 0);
};

console.log("sol", solution());
