const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(line => { return { type: line.split(' ')[0], val: line.split(' ')[1] } })

const solution = () => {
  let index = 0
  let acc = 0
  const instructionhistory = []
  while (!instructionhistory.includes(index) && index < values.length) {
    if(index === 364) {
      values[index].type = 'nop'
      console.log(acc);
    }
    switch (values[index].type) {
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
    if(values[index]) values[index].acc = acc
  }
  console.log(acc);
  const details = instructionhistory.map(index => {return {type: values[index].type, val: values[index].val, index, acc: values[index].acc}})
  fs.writeFileSync('./details.json', JSON.stringify(details), 'utf-8')
  return acc
}

console.log(solution())