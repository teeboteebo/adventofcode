const fs = require('fs')
const values = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')

const amtOfMoves = values.length
// console.log(amtOfMoves);
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
    } else if (starts[0][i] === ends[0][i]) {
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
      continue
    } else {
      // Diagonal hell
      const startX = starts[0][i]
      const endX = ends[0][i]
      const startY = starts[1][i]
      const endY = ends[1][i]

      const coords = returnAllCoords(startX, startY, endX, endY)
      coords.forEach(([x, y]) => {
        grid.forEach((row, rowY) => {
          if (rowY === y) {
            const newRow = row.map((val, colX) => {
              if (colX === x) {
                // console.log(val);
                return val + 1
              }
              return val
            })
            grid.splice(y, 1, newRow)
          }
        })
      })
    }
  }
}
const returnAllCoords = (startX, startY, endX, endY) => {
  let xDir = startX > endX ? -1 : 1
  let yDir = startY > endY ? -1 : 1
  const coordsAmt = Math.abs(startX - endX) + 1
  const coords = (new Array(coordsAmt).fill()).map((_, i) => {
    return [startX + (i * xDir), startY + (i * yDir)]
  })

  return coords
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