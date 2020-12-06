const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n\n').map(group => group.trim().split('\n'))

const solution = () => {
  const uniqueGroupValues = values.map(group => {
    const answers = group.join('').split('')
    const uniqueAnswers = [...new Set(answers)]
    return uniqueAnswers.length
  })
  const answer = uniqueGroupValues.reduce((prev, curr) => prev + curr)
  return answer
}

console.log(solution())