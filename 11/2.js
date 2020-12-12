const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(line => line.split(''))
// values = AoA
let amountOfSitDowns = 0
const sitDown = (prevValues) => {
  amountOfSitDowns++
  let changesMade = false
  const orgValues = [...prevValues]
  const newValues = [...prevValues].map((line, lineIndex) => {
    return line.map((seat, seatIndex) => {
      const directions = [
        [-1,-1],  // top left
        [-1, 0],  // top 
        [-1, 1],  // top right
        [0, -1],  // left
        [0, 1],   // right
        [1, -1],  // bottom left
        [1, 0],   // bottom
        [1, 1]    // bottom right
      ]
      const adjSeats = directions.map(dir => {
        let val = orgValues[lineIndex + dir[0]] && orgValues[lineIndex + dir[0]][seatIndex + dir[1]] || null
        let i = 2
        while(val === '.'){
          val = orgValues[lineIndex + (dir[0] * i)] && orgValues[lineIndex + (dir[0] * i)][seatIndex + (dir[1] * i)] || null
          i++
        }
        return val
      })
      if (seat === 'L') {
        if (adjSeats.filter(s => s === '#').length === 0) {
          seat = '#'
          changesMade = true
        }
      } else if (seat === '#') {
        if (adjSeats.filter(s => s === '#').length >= 5) {
          seat = 'L'
          changesMade = true
        }
      }
      return seat
    })
  })
  if (changesMade) {
    return sitDown(newValues)
  } else {
    return newValues
  }
}

let start = new Date().getTime()
const seatsTaken = sitDown(values).reduce((prev, curr) => prev.concat(curr)).filter(seat => seat === '#').length
console.log(seatsTaken);
console.log('Total iterations:', amountOfSitDowns);
console.log('Time elapsed:', (new Date().getTime() - start), 'ms');