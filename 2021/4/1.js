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

const solution1 = () => {
  const data = formatData(values)
  let winner = null
  let winningDraw = null

  data.numbers.forEach((number, i) => {
    if (winner) return
    data.drawnNumbers.push(number)

    for (let ticket in data.tickets) {
      const checkWin = checkTicket(data.tickets[ticket], data.drawnNumbers)
      if (checkWin) {
        winner = checkWin
        winningDraw = number
      }
    }
  })

  const sumOfNotDrawn = winner.rows.reduce((prev, curr) => {
    return prev + (curr.reduce((nextLevPrev, nextLevCurr) => {
      if (data.drawnNumbers.includes(nextLevCurr)) {
        return nextLevPrev
      }
      return nextLevPrev + nextLevCurr
    }, 0))
  }, 0)


  return { winner, winningDraw, sumOfNotDrawn, result: sumOfNotDrawn * winningDraw }
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

console.log(solution1())