const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').trim().split('.\n')
const solution = () => {
  const rules = values.map(rule => {
    rule = rule.trim().split(' ')
    const name = rule.splice(0, 2).join('')
    const contains = rule.join(' ').replace('bags contain', '').split(',').map(bag => {
      bag = bag.trim().replace('.', '')
      if (bag === 'no other bags') return 
      else {
        bag = bag.split(' ')
        return {
          name: bag.splice(1, 2).join(''),
          amt: Number(bag[0])
        }
      }
    }).filter(bag => bag)
    const bagdetails = { name, contains }
    return bagdetails
  })
  const findgoldies = () => {
    let shinies = ['shinygold']
    let nomoreshinies = false
    while (!nomoreshinies) {
      let updatedshinies = [...shinies]
      rules.forEach(rule => {
        shinies.forEach(shinybag => {
          rule.contains.forEach(bag => {
            if (bag && bag.name === shinybag && !updatedshinies.includes(rule.name)) updatedshinies.push(rule.name)
          })
        })
      })
      if (updatedshinies.length === shinies.length) nomoreshinies = true
      shinies = updatedshinies
    }
    return shinies
  }
  const pathstogold = findgoldies()
  const shinies = rules.filter(bag => {
    let couldhaveshinies = false
    if (bag.contains[0]) {
      let bagnames = bag.contains.map(bag => bag.name)
      bagnames.forEach(name => {
        if (pathstogold.includes(name)) couldhaveshinies = true
      })
    }
    return couldhaveshinies
  })
  return shinies.length
}

let start = new Date().getTime()
console.log(solution())
console.log('Time elapsed:', (new Date().getTime() - start), 'ms');