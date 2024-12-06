const fs = require("fs");
const { get } = require("http");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()

  const solution = () => {

  }

  console.log(solution());