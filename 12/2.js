const { doesNotThrow } = require('assert')
const fs = require('fs')
const commands = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(command => {
  const type = command.match(/[A-Z]/g)[0]
  const value = Number(command.match(/[0-9]+/g)[0])
  return { type, value }
})
const solution = () => {
  let waypoint = { north: 1, east: 10 }
  let position = { north: 0, east: 0 }
  for (let command of commands) {
    let rotate = rotateWaypoint
    switch (command.type) {
      case 'N':
        waypoint.north += command.value
        break
      case 'E':
        waypoint.east += command.value
        break
      case 'S':
        waypoint.north -= command.value
        break
      case 'W':
        waypoint.east -= command.value
        break
      case 'F':
        position.north += waypoint.north * command.value
        position.east += waypoint.east * command.value
        break
      case 'L':
        const stepsLeft = command.value / 90
        let iLeft = 0
        while (iLeft < stepsLeft) {
          waypoint = rotate(waypoint, 'L')
          iLeft++
        }
        break
      case 'R':
        const stepsRight = command.value / 90
        let iRight = 0
        while (iRight < stepsRight) {
          waypoint = rotate(waypoint, 'R')
          iRight++
        }
        break
    }
  }
  console.log('End pos:', position);
  return Math.abs(position.north) + Math.abs(position.east)
}
const rotateWaypoint = (waypoint, leftorright) => {
  const { north, east } = waypoint
  if (leftorright === 'L') {
    waypoint.north = east
    waypoint.east = -1 * north
    return waypoint
  } else if (leftorright === 'R') {
    waypoint.north = -1 * east
    waypoint.east = north
    return waypoint
  } else {
    console.log('Something went wrong');
  }
}
console.log('Answer:', solution())
