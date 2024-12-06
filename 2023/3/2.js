const fs = require("fs");
const { get } = require("http");
const rowLength = fs
.readFileSync("./sample.txt", "utf-8")
.trim()
.split("\n\n")
.map((string) => string.split("\n"))
.flat()[0].length

const values = fs
  .readFileSync("./sample.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .join('')


const isGear = (value) => {
  return !!value && value === "*";
};

const solution = () => {
  let i  = 0
  for(let char of values) {
    let rowIndex = i % rowLength
    
    if(isGear(char)) {
      // get all numbers +/- 1 of rowIndex && i max +/- rowLength +1
      const neighbors = []
      
      // Is gear, check neighbors

    }



    i++
  }
};

console.log(solution());
