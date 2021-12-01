const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .trim()
  .split('\n\n')
  .map(group => group.trim().split('\n'))
  .flat()
  .map(string => Number(string))

const solution = () => {
  console.log(values)
  const result = '?'
  return result
}

console.log(solution())