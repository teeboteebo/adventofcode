const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(x => Number(x))

const solution = () => {
  let state = values
  for (let i = 0; i < 256; i++) {
    // previous day
    const priorDay = state

    // cleanup 0s from last round and keep track of how many
    let amountToAdd = 0
    const cleaned = priorDay.map(x => {
      if (!x) { amountToAdd++ }
      return x > 0 ? x : x < 0 ? 1 : 7
    })
    for (let i = 0; i < amountToAdd; i++) {
      // console.log('adding an 8');
      cleaned.push(9)
    }
    // console.log({ cleaned, amountToAdd });

    const newDay = cleaned.map(fish => {
      return fish - 1
    });
    // console.log(newDay);
    console.log(i);
    // console.log({ day: i + 1, state: newDay });
    state = newDay
  }
  return state.length
}

// solution2()
console.log(solution())