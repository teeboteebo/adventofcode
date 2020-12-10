const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(num => Number(num))

const solution = () => {
  const sorted = values.sort((a, b) => a > b ? -1 : 1)
  const onesandthrees = sorted.reduce((prev, curr) => {
    if (Number(prev) === prev) {
      prev = { prev, ones: 1, threes: 1 }
    }
    const diff = prev.prev - curr
    return diff === 3 ? { prev: curr, ones: prev.ones, threes: prev.threes + 1 } : { prev: curr, ones: prev.ones + 1, threes: prev.threes }
  })
  const answer = onesandthrees.ones * onesandthrees.threes
  return answer
}

console.log('Answer:', solution())