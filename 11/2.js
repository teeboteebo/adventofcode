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
      // []   []   []
      // [] [seat] []
      // []   []   []
      const adjacentSeats = [
        { val: orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex - 1)] || null, x: -1, y: -1 }, // top left
        { val: orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex)] || null, x: 0, y: -1 }, // top
        { val: orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex + 1)] || null, x: 1, y: -1 }, // top right
        { val: orgValues[(lineIndex)][(seatIndex - 1)] || null, x: -1, y: 0 }, // left
        { val: orgValues[(lineIndex)][(seatIndex + 1)] || null, x: 1, y: 0 }, // right
        { val: orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex - 1)] || null, x: -1, y: 1 }, // bottom left
        { val: orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex)] || null, x: 0, y: 1 }, // bottom
        { val: orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex + 1)] || null, x: 1, y: 1 } // bottom right
      ]
      // console.log(adjacentSeats);
      const partTwo = adjacentSeats.map(seat => {
        if (seat.val === '.') {
          // console.log('no seat, looking for next');
          return findNextVisibleSeat(orgValues, seat)
        } else return seat
      })
      // console.log(partTwo);
      if (seat === 'L') {
        if (partTwo.filter(s => s.val === '#').length === 0) {
          seat = '#'
          changesMade = true
        }
      } else if (seat === '#') {
        if (partTwo.filter(s => s.val === '#').length >= 5) {
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
const findNextVisibleSeat = (values, seat, multiplier = 2) => {
  const {val, x, y} = seat
  if (val === null) return seat
  const newSeat = { val: values[y * multiplier] && values[y * multiplier][x * multiplier] || null, x: x * multiplier, y: y * multiplier }
  if (newSeat.val === null) {
    return seat
  } else if(newSeat.val === 'L' || newSeat.val === '#') {
    // console.log('seat found');
    return newSeat
  } else {
    findNextVisibleSeat(values, seat, multiplier++)
  }

    // console.log('RUNNING');
}
const seatsTaken = sitDown(values).flat().filter(seat => seat === '#').length
console.log(seatsTaken);
console.log('Total iterations:', amountOfSitDowns);