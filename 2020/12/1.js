const fs = require('fs')
const commands = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(command => {
  const type = command.match(/[A-Z]/g)[0]
  const value = Number(command.match(/[0-9]+/g)[0])
  return { type, value }
})
const solution = () => {
  let position = { north: 0, east: 0, direction: 'E' }
  for (let command of commands) {

    console.log(position);
    console.log(command);
    let rotate = rotateBoat
    switch (command.type) {
      case 'N':
        position.north += command.value
        break
      case 'E':
        position.east += command.value
        break
      case 'S':
        position.north -= command.value
        break
      case 'W':
        position.east -= command.value
        break
      case 'F':
        if (position.direction === 'N') {
          position.north += command.value
        }
        if (position.direction === 'E') {
          position.east += command.value
        }

        if (position.direction === 'S') {
          position.north -= command.value

        }
        if (position.direction === 'W') {
          position.east -= command.value
        }
        break
      case 'L':
        const stepsLeft = command.value / 90
        let iLeft = 0
        while (iLeft < stepsLeft) {
          position.direction = rotate(position.direction, 'L')
          iLeft++
        }
        break
      case 'R':
        const stepsRight = command.value / 90
        let iRight = 0
        while (iRight < stepsRight) {
          position.direction = rotate(position.direction, 'R')
          iRight++
        }
        break
    }

  }
  console.log('End pos:', position);
  return Math.abs(position.north) + Math.abs(position.east)
}
const rotateBoat = (currDir, leftorright) => {
  console.log('running', leftorright);
  const directions = ['N', 'E', 'S', 'W']
  if (leftorright === 'L') {
    console.log('Changing dir', directions[directions.indexOf(currDir) - 1] || directions[directions.length - 1]);
    return directions[directions.indexOf(currDir) - 1] || directions[directions.length - 1]
  } else if (leftorright === 'R') {
    console.log(directions.indexOf(currDir) + 1);
    console.log('Changing dir', directions[directions.indexOf(currDir) + 1] || directions[0])
    return directions[directions.indexOf(currDir) + 1] || directions[0]
  } else {
    console.log('Something went wrong');
  }
}
console.log('Answer:', solution())



const moveBoat = command => {
  const { type, value } = command
  switch (type) {
    case 'N':

      break
    case 'E':
    case 'S':
    case 'W':
    case 'F':
    case 'L':

    case 'R':

  }
}