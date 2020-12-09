const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(line => { return { type: line.split(' ')[0], val: line.split(' ')[1] } })

const solution = (start = 0, startvalue = 0) => {
  let changedindex = null
  let changedacc = null
  let index = start
  let acc = startvalue
  const instructionhistory = []
  while (!instructionhistory.includes(index) && index < values.length) {
    let type = values[index].type
    if (index !== start) {
      if (!changedindex && values[index].type === 'jmp') {
        console.log(index, start, 'index is not start, changing jmp to nop');
        type = 'nop'
        changedindex = index
        changedacc = acc
      } else if (!changedindex && values[index].type === 'nop') {
        console.log(index, start, 'index is not start, changing npt top jmp');
        type = 'jmp'
        changedindex = index
        changedacc = acc
      }
    }
    switch (type) {
      case 'acc':
        instructionhistory.push(index)
        acc += Number(values[index].val)
        index += 1
        break
      case 'jmp':

        instructionhistory.push(index)
        index += Number(values[index].val)
        break
      case 'nop':
        instructionhistory.push(index)
        index += 1
        break
    }
  }
  if (index !== values.length) {
    console.log('we hit a loop, resetting to:', changedindex, changedacc );
    solution(changedindex, changedacc)
  } else {
    console.log('ended on last index');
    console.log(acc);
    answer = acc
  }
}
solution()


