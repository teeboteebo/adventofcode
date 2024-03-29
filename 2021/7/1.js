const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(x => Number(x))

const solution = () => {
  let cheapest = Number.MAX_SAFE_INTEGER
  const minPos = Math.min(...values)
  const maxPos = Math.max(...values)

  for (let i = minPos; i <= maxPos; i++) {
    const costToMove = values.reduce((prev, curr) => prev + Math.abs(curr - i), 0)
    cheapest = cheapest < costToMove ? cheapest : costToMove
  }

  return cheapest
}

console.log(solution())