const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n\n').map(group => group.trim().split('\n'))

const solution = () => {
  const uniqueGroupValues = values.map(group => {
    const people = group.length
    const answers = group.join('').split('')
    const uniqueAnswers = [...new Set(answers)]
    const allYes = uniqueAnswers.filter(ans => {
        const answerstring = answers.join('')
        const re = new RegExp(ans, 'g')
        const answerOccurances = (answerstring.match(re) || []).length
        return answerOccurances >= people
    })
    return allYes.length
  })
  const answer = uniqueGroupValues.reduce((prev, curr) => prev + curr)
  return answer
}

console.log(solution())