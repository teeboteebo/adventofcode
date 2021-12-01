const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')
const time = Number(input[0])
const busses = input[1].split(',').filter(bus => Number(bus)).map(bus => {
  bus = Number(bus)
  const busObj = {
    bus: bus,
    val: time / bus % 1,
    nextDeparture: Math.floor(time / bus + 1) * (bus)
  };
  return busObj
}).sort((a, b) => a.val > b.val ? -1 : 1)
console.log('answer:', busses[0].bus * (busses[0].nextDeparture - time))
// busses.map(bus => console.log(bus, time/bus))