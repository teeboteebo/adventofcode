const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .trim()
  .split('\n\n')
  .map(group => group.trim().split('\n'))
  .flat()
  .map(string => Number(string))

const solution = () => {
  let increments = 0
  values.reduce((prev, curr) => {
    if (curr > prev) { increments += 1 }
    return curr
  }, null)
  return increments - 1
}

console.log(solution())