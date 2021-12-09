const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(x => Number(x))

const school = new Array(9).fill(0);

values.forEach(f => {
  school[f] += 1;
});

for (let day = 0; day < 256; day++) {
  let fish;
  for (let i = 8; i >= 0; i--) {
    if (i === 0) {
      school[6] += school[i];
      school[8] = school[i];
      school[i] = fish;
    } else if (i === 8) {
      fish = school[i];
    } else {
      let oldFish = school[i];
      school[i] = fish;
      fish = oldFish;
    }
  }
}

console.log(school.reduce((p, c) => p + c));