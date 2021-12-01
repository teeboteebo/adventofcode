const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((row) => row.trim());

const solution = (incr, down = 1) => {
  let index = incr
  let treecount = 0
  for (let i = down; i < values.length; i += down) {
    const row = values[i];
    const rowindex = index % row.length
    if (row[rowindex] === '#') {
      treecount += 1
    }
    index += incr
  }
  return treecount
}

  console.log(solution(3))