const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .trim()
  .split('\n\n')
  .map(group => group.trim().split('\n'))
  .flat()



const solution2 = () => {
  let x = 0, y = 0, aim = 0
  values.forEach((val) => {
    const amount = Number(val.split(' ')[1])

    switch (true) {
      case val.startsWith('forward'): {
        x += amount
        y += aim * amount
        break
      }
      case val.startsWith('down'): {
        aim += amount
        break
      }
      case val.startsWith('up'): {
        aim -= amount
        break
      }
      default:
        break
    }
    console.log(x,y);
  })
  console.log(x, y);
  return x * y
}

console.log(solution2())