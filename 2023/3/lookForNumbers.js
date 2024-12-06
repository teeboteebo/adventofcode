const fs = require("fs");
const values = fs
  .readFileSync("./sample.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .map((string) => string.split(""));

// values:
// [
//   ['4','6','7','.','.','1','1','4','.','.'],
//   ['.','.','.','*','.','.','.,','.','.','.']
// ]

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

  return { val: values[row][column], neighbors };
};

const solution = () => {
  const numbers = [];

  let numbersToCheck = [];
  values.forEach((row, i) => {
    row.forEach((column, j) => {
      const currVal = column;

      if (Number(currVal)) {
        numbersToCheck.push(getNeighbors(i, j));
      }
      if (!Number(currVal) && numbersToCheck.length > 0) {
        numbers.push(numbersToCheck);
        numbersToCheck = [];
      }
    });
  });


  const numberSets = numbers.map((numberSet) => {
    let totalNumbers = numberSet.map((number) => number.val).join("");
    let totalNeighbors = [
      ...new Set(numberSet.map((number) => number.neighbors).flat()),
    ];
    return { totalNumbers, totalNeighbors };
  });

  console.log(numberSets);
  const activeOnly = numberSets.filter((numberSets) => {
    return numberSets.totalNeighbors.some(
      (neighbor) => !Number(neighbor) && neighbor !== "."
    );
  });

  const sum = activeOnly.reduce((acc, cur) => {
    return acc + Number(cur.totalNumbers);
  }, 0);
  return sum;
};

console.log("sol", solution());
