const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(num => Number(num))

const solution = () => {
  let invalidnum = null
  let i = 0
  let readsetlength = 25
  while (!invalidnum && i < values.length - readsetlength) {
    const numtocheck = values[(readsetlength + i)]
    const readset = [...values].splice(i, readsetlength)
    const possiblesums = []
    readset.forEach((num, numindex) => {
      readset.forEach((numtwo, numindextwo) => {
        if (numindex !== numindextwo) {
          possiblesums.push((num + numtwo))
        }
      })
    })
    if(!possiblesums.includes(numtocheck)) invalidnum = numtocheck
    i++
  }
  return invalidnum

}

console.log('Invalid:', solution())