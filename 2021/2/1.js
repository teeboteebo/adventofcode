const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .trim()
  .split('\n\n')
  .map(group => group.trim().split('\n'))
  .flat()

const values1 = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
]

const solution1 = () => {
  const forwards = values.filter(val => val.startsWith('forward'))
  const downs = values.filter(val => val.startsWith('down'))
  const ups = values.filter(val => val.startsWith('up'))

  const downSum = downs.reduce((prev, curr) => prev + Number(curr.split(' ')[1]), 0)
  const upSum = ups.reduce((prev, curr) => prev + Number(curr.split(' ')[1]), 0)

  const x = forwards.reduce((prev, curr) => prev + Number(curr.split(' ')[1]), 0)
  const y = downSum - upSum

  const result = x * y
  return result
}


console.log(solution1())