const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(num => Number(num))


const solution = () => {
  const sorted = values.sort((a, b) => a > b ? 1 : -1)
  sorted.unshift(0)
  sorted.push(sorted[sorted.length - 1] + 3)

  let totalcombinations = 0
  let multiplier = 1
  let i = 0
  while (i < sorted.length) {
    const [currentIndex, one, two, three, four] = [...sorted].splice(i, i + 5)
    console.log(currentIndex, one, two, three)
    const validways = [one, two, three].filter((step, i) => {
      console.log(i, step, currentIndex + 1 === step || currentIndex + 2 === step || currentIndex + 3 === step);
      return currentIndex + 1 === step || currentIndex + 2 === step || currentIndex + 3 === step
    }).length
    const doubletriplet = four - one === 3
    if (validways === 3 && doubletriplet) {
      multiplier *= 7
      i += 4
    } else if (validways === 3) {
      console.log(`${multiplier} *= 4`);
      multiplier *= 4
      i += 3
    } else if (validways === 2) {
      console.log(`${multiplier} *= 2`);
      multiplier *= 2
      i += 2
    }
    else {
      i++
    }
    console.log('total:', multiplier);

  }

  const answer = totalcombinations
  return answer
}

console.log('Answer:', solution())