const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')

const amtOfMoves = values.length
console.log(amtOfMoves);
const solution = () => {
  const [x1, y1, x2, y2] = formatVals(values)
  const width = Math.max(...x1.concat(x2))
  const height = Math.max(...y1.concat(y2))
  let grid = new Array(height + 1).fill(new Array(width + 1).fill(0))

  draw([x1, y1], [x2, y2], grid)

  const amtGrtTwo = grid.flat().filter(x => x > 1).length
  return amtGrtTwo
}

const draw = (starts, ends, grid) => {
  for (let i = 0; i < amtOfMoves; i++) {
    if (starts[1][i] === ends[1][i]) {
      // Drawing X
      const y = starts[1][i]
      const start = Math.min(starts[0][i], ends[0][i])
      const end = Math.max(starts[0][i], ends[0][i])

      const newRow = grid[y].map((val, x) => {
        if (x >= start && x <= end) {
          return val += 1
        }
        return val
      })
      grid.splice(y, 1, newRow)
    }
    if (starts[0][i] === ends[0][i]) {
      // Drawing Y
      const x = starts[0][i]
      const start = Math.min(starts[1][i], ends[1][i])
      const end = Math.max(starts[1][i], ends[1][i])
      grid.forEach((row, y) => {
        if (y >= start && y <= end) {
          const newRow = row.map((val, index) => {
            if (index === x) {
              return val + 1
            }
            return val
          })
          grid.splice(y, 1, newRow)
        }
      })
    }
  }
}

const formatVals = (vals) => {
  const values = vals.map(val => {
    return val.replace(' -> ', ',').split(',')

  })
  const formatted = [[], [], [], []]
  values.forEach((vals, i) => vals.forEach((val, i) => {
    formatted[i].push(Number(val))
  }))

  return formatted
}

console.log(solution())