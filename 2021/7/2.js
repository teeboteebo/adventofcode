const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map(x => Number(x))

  console.log(values.length);

const solution = () => {
  let cheapest = Number.MAX_SAFE_INTEGER
  let index
  const minPos = Math.min(...values)
  const maxPos = Math.max(...values)

  for (let i = minPos; i <= maxPos; i++) {
    const costToMove = values.reduce((prev, curr) => {
      const distance = Math.abs(curr - i)
      const cost = (distance * 0.5 + 0.5) * distance
      return prev + cost
    }, 0)
    cheapest = cheapest < costToMove ? cheapest : costToMove
    index = cheapest < costToMove ? index : i
  }
  console.log(index);
  return cheapest
}


console.log(solution())











