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
    if (!possiblesums.includes(numtocheck)) invalidnum = numtocheck
    i++
  }
  return invalidnum
}
const solutiontwo = () => {
  const target = solution() // 375054920
  const all = values.filter(val => val < target) // no need to check any values higher than targetsum
  let match = undefined
  all.forEach((value, index) => {
    if (match) return
    let amt = 1
    let sum = 0
    while (amt <= all.length && sum !== target) {
      sum = 0
      let subset = [...all].splice(index, amt)
      sum = subset.reduce((a, b) => a + b)
      // console.log(index, amt, subsetsum);
      if (sum === target) {
        console.log(`Subset found at index: ${index} with amount: ${amt}. (sum: ${sum})`);
        match = subset
      }
      else amt++
    }
  })
  match.sort((a, b) => a > b ? 1 : -1)
  return match[0] + match[match.length - 1]
}


let start = new Date().getTime()
console.log(solutiontwo())
console.log('Time elapsed:', (new Date().getTime() - start), 'ms');