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
  //   console.log(rules);
  let bags = []
  const countbags = (bagname = 'shinygold', amount = 1) => {
    let bagtocheck = rules.find(bag => bag.name === bagname)
    let innerbags = bagtocheck.contains    
    if (!innerbags) return
    else {
      innerbags.forEach(bag => {
        for(let i = 0; i < bag.amt * amount; i++){
          bags.push(bag.name)
        }
        countbags(bag.name, bag.amt * amount)
      })
    }
  }
  countbags()
  return bags.length
}

console.log(solution())