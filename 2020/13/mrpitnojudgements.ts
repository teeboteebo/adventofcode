//@ts-ignore
const fs = require('fs')
//
//@ts-ignore
const busInformation: string[] = fs.readFileSync('./input.txt')
  .toString().split("\n");

const earliestDeparture: number = +busInformation[0];
const busIdStrings: string[] = busInformation[1].split(",");
const busIds: number[] = busIdStrings.filter(busId => busId !== "x").map(busId => +busId);

const getEarliestBus = (): number => {
  let waitDuration: number = 1000;
  let earliestBusId: number = 0;
  for (let busId of busIds) {
    const busLeftMinBefore: number = earliestDeparture % busId;
    const waitTimeForBus: number = busId - busLeftMinBefore;
    if (waitTimeForBus < waitDuration) {
      waitDuration = waitTimeForBus;
      earliestBusId = busId;
    }
  }
  return waitDuration * earliestBusId;
}

// least common multiple
const getLcm = (a: number, b: number): number => {
  return (a * b) / getGcd(a, b);
}

const getGcd = (a: number, b: number): number => {
  let remainder: number = 0;
  do {
    remainder = a % b;
    a = b;
    b = remainder;
  } while (b != 0);
  return a;
}

const getEarliestSequence = (): number => {
  let time = 0;

  const firstBusId: number = +busIdStrings[0];

  let minToNextBus: number = 1; // distance to calculate between busses
  let leastCommonMultiple: number = firstBusId; // helper value for calculation

  for (let i = 1; i < busIdStrings.length; i++) {
    const busId: string = busIdStrings[i];
    if (busId === "x") {
      minToNextBus++;
    } else {
      let jumpHelper: number = leastCommonMultiple / +busId;
      let j: number = (minToNextBus + time)/+busId;
      let distance: number = 0;
      let jEven: number = 0;
      while (distance !== (minToNextBus + time)) {
        j += jumpHelper;
        jEven = Math.round(j);
        distance = jEven * +busId % leastCommonMultiple;
        if (jEven >= leastCommonMultiple) {
          console.error("Invalid input data");
          break;
        }
      }
      time = jEven * +busId;
      leastCommonMultiple = getLcm(+busId, leastCommonMultiple);
      console.log(time + " " + minToNextBus + " " + jEven + " " + leastCommonMultiple);
      minToNextBus = 1;
    }
  }
  return time - (busIdStrings.length - 1);
}

console.log(getEarliestBus()); // part 1
console.log(getEarliestSequence()); // part 2