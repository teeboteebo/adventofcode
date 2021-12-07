const fs = require('fs')
const { rootCertificates } = require('tls')
const values = fs
  .readFileSync('./sample.txt', 'utf-8')
  .split('\n')

const amtOfMoves = values.length
// console.log(amtOfMoves)
const solution = () => {
  const [x1, y1, x2, y2] = formatVals(values)
  const width = Math.max(...x1.concat(x2))
  const height = Math.max(...y1.concat(y2))
  const grid = new Array(height + 1).fill().map(x => new Array(width + 1).fill(0))

  draw([x1, y1], [x2, y2], grid)
  Object.values(grid).map(row => console.log(JSON.stringify(row.map(x => x === 0 ? '▪️' : `${x}`))))
  const amtGrtTwo = grid.flat().filter(x => x > 1).length
  return amtGrtTwo
}

const draw = (starts, ends, grid) => {
  for (let i = 0; i < amtOfMoves; i++) {

    const startX = starts[0][i]
    const endX = ends[0][i]
    const startY = starts[1][i]
    const endY = ends[1][i]
    const coords = returnAllCoords(startX, startY, endX, endY)

    coords.forEach(([x, y]) => {
      grid[y][x] += 1
    })

  }
}
const returnAllCoords = (startX, startY, endX, endY) => {
  let xDir = startX === endX ? 0 : startX > endX ? -1 : 1
  let yDir = startY === endY ? 0 : startY > endY ? -1 : 1

  const coordsAmt = Math.abs(startX - endX) + 1
  const coords = (new Array(coordsAmt).fill()).map((_, i) => {
    return [startX + (i * xDir), startY + (i * yDir)]
  })
  // console.log(coords)
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