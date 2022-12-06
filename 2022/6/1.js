const fs = require("fs");
const datastream = fs.readFileSync("./input.txt", "utf-8").split("");

const solution = () => {
  const amountLookingFor = 4;
  let segmentfound = false;
  let numbersProcessed = amountLookingFor;
  let i = 0;
  while (!segmentfound && numbersProcessed < datastream.length) {
    const segmentToCheck = datastream.slice(i, i + amountLookingFor);
    const uniqueChars = new Set(segmentToCheck);
    if (uniqueChars.size === amountLookingFor) {
      segmentfound = true;
    } else {
      i++;
      numbersProcessed++;
    }
  }
  return numbersProcessed;
};

console.log(solution());
