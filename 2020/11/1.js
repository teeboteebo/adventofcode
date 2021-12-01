const fs = require('fs')
const values = fs.readFileSync('./sample.txt', 'utf-8').trim().split('\n').map(line => line.split(''))
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
        orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex - 1)] || null, // top left
        orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex)] || null, // top
        orgValues[(lineIndex - 1)] && orgValues[(lineIndex - 1)][(seatIndex + 1)] || null, // top right
        orgValues[(lineIndex)][(seatIndex - 1)] || null, // left
        orgValues[(lineIndex)][(seatIndex + 1)] || null, // right
        orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex - 1)] || null, // bottom left
        orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex)] || null, // bottom
        orgValues[(lineIndex + 1)] && orgValues[(lineIndex + 1)][(seatIndex + 1)] || null // bottom right
      ]
      if (seat === 'L') {
        if (adjacentSeats.filter(s => s === '#').length === 0) {
          seat = '#'
          changesMade = true
        }
      } else if (seat === '#') {
        if (adjacentSeats.filter(s => s === '#').length >= 4) {
          seat = 'L'
          changesMade = true
        }
      }
      //      If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      //      If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      //      Otherwise, the seat's state does not change.
      return seat
    })
  })
  if (changesMade) {
    return sitDown(newValues)
  } else {
    return newValues
  }
}
const seatsTaken = sitDown(values).flat().filter(seat => seat === '#').length
console.log(seatsTaken);
console.log('Total iterations:', amountOfSitDowns);