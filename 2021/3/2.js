const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')

const solution1 = () => {
  let filter = ''
  const transposed = transpose(values.filter(val => val.startsWith(filter)))
  let oxGenRat = getRating('oxygen', transposed)
  let c02ScrRat = getRating('c02', transposed)

  return parseInt(oxGenRat, 2) * parseInt(c02ScrRat, 2)
}

const getRating = (type, arr) => {
  let filter = ''
  let ratings = []
  arr.forEach((digits, i) => {
    if (i !== 0) {
      if (ratings.length === 1) return
      digits = transpose(ratings)[i]
    }

    const charArr = digits.split('')
    const zeros = charArr.filter(char => char === '0').length
    const ones = charArr.filter(char => char === '1').length

    switch (type) {
      case 'oxygen':
        if (ones === zeros) {
          filter += '1'
        } else {
          filter += ones > zeros ? '1' : '0'
        }
        break
      case 'c02':
        if (ones === zeros) {
          filter += '0'
        } else {
          filter += ones > zeros ? '0' : '1'
        }
        break
      default:
        break
    }
    
    ratings = values.filter(val => val.startsWith(filter))
  })
  
  return ratings[0]
}

const transpose = (arr, backup) => {
  if(arr.length < 1) return backup
  const newArr = arr[0].split('').map(() => '')

  const transposed = newArr.map((string, index) => {
    arr.forEach(binary => {
      if (!binary) return ''

      string += binary.split('')[index]
    });
    return string
  })

  return transposed
}

console.log(solution1())