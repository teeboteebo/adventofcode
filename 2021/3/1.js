const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')

const solution1 = () => {
  const transposed = transpose(values)

  const gamma = parseInt(transposed.map(string => {
    const charArr = string.split('')
    const zeros = charArr.filter(char => char === '0').length
    const ones = charArr.filter(char => char === '1').length

    return ones > zeros ? '1' : '0'
  }).join(''), 2)

  const epsilon = parseInt(transposed.map(string => {
    const charArr = string.split('')
    const zeros = charArr.filter(char => char === '0').length
    const ones = charArr.filter(char => char === '1').length

    return ones > zeros ? '0' : '1'
  }).join(''),2)


  return gamma * epsilon
}

const transpose = (arr) => {
  const newArr = arr[0].split('').map(() => '')

  const transposed = newArr.map((string, index) => {
    arr.forEach(binary => {
      string += binary.split('')[index]
    });
    return string
  })

  return transposed
}

console.log(solution1())