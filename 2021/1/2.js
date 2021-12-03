const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(string => Number(string))
  
const solution = () => {
  let increments = 0
  values.reduce((prev, curr, index) => {
    const window = [...values].slice(index, index + 3)
    if (window.length === 3) {
      const sum = window.reduce((a, b) => a + b, 0)
      if (sum > prev) { increments += 1 }
      return sum
    }
    return null
  }, null)
  return increments - 1
}

console.log(solution())