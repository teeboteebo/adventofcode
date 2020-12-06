const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')    //.map((row) => row.trim().replace(/(\r\n)/g, ' '));

const solution = () => {
  const seats = values.map(seatdata => getSeat(seatdata))
  const sorted = seats.sort((a, b) => a > b ? 1 : -1)
  let myseat = null
  let i = sorted[0]
  while (!myseat && i < 911) {
    if(!sorted.includes(i)) myseat = i;
    i++
  }
  return myseat
}
const getSeat = (seatDirections) => {
  const seatRepresentation = seatDirections
    .replace(/F/g, 0)
    .replace(/B/g, 1)
    .replace(/L/g, 0)
    .replace(/R/g, 1);
  const rowValue = seatRepresentation.substring(0, 7);
  const columnValue = seatRepresentation.substring(7);
  const row = parseInt(rowValue, 2);
  const column = parseInt(columnValue, 2);
  const seatid = row * 8 + column;
  return seatid
}
console.log(solution());