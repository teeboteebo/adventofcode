const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')

const formatData = (input) => {
  const formatted = {
    drawnNumbers: [],
    numbers: [],
    tickets: {}
  }
  let ticketNo = 0
  input.forEach((row) => {
    if (row.includes(',')) {
      formatted.numbers = row.split(',').map(string => Number(string))
      return
    }

    if (row === '') {
      ticketNo++
      return
    }

    if (!formatted.tickets[ticketNo]) {
      formatted.tickets[ticketNo] = { rows: [] }
    }

    formatted.tickets[ticketNo].rows.push(row.split(' ').filter(val => val).map(string => Number(string)))
  });
  return formatted
}

const solution2 = () => {
  const data = formatData(values)
  let winners = []

  data.numbers.forEach((number, i) => {
    if(winners.length !== 100) {
      data.drawnNumbers.push(number)
    }
    for (let ticket in data.tickets) {
      const checkWin = checkTicket(data.tickets[ticket], data.drawnNumbers)
      if (checkWin) {
        winners.push({
          winner: checkWin,
          number
        })
        delete data.tickets[ticket]
      }
    }
  })
  const lastWinner = winners[winners.length - 1]
  
  const sumOfNotDrawn = lastWinner.winner.rows.reduce((prev, curr) => {
    return prev + (curr.reduce((nextLevPrev, nextLevCurr) => {
      if (data.drawnNumbers.includes(nextLevCurr)) {
        return nextLevPrev
      }
      return nextLevPrev + nextLevCurr
    }, 0))
  }, 0)


  return { lastWinner: lastWinner.winner, draw: lastWinner.number, sumOfNotDrawn, result: sumOfNotDrawn * lastWinner.number }
}

const checkTicket = (ticket, drawnNumbers) => {
  const { rows } = ticket
  const columns = rows.map((row, y) => {
    return row.map((_, x) => rows[x][y])
  })

  const winningRow = rows.some(row => row.every(num => drawnNumbers.includes(num)))
  const winningCol = columns.some(col => col.every(num => drawnNumbers.includes(num)))

  if (winningRow || winningCol) return ticket

  return null
}

console.log(solution2())