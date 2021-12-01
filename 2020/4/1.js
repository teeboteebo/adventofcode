const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map((row) => row.trim().replace(/(\r\n)/g, ' '));

const solution = () => {
  const formattedPassports = values.map(pp => {
    const aoo = pp.split(' ').map(attr => {
      const obj = {}
      obj[attr.split(':')[0]] = attr.split(':')[1]
      return obj
    })
    const passport = {}
    aoo.forEach(obj => {
      Object.assign(passport, obj)
    })
    return passport
  })
  const validAmount = formattedPassports.filter(pp => checkValid(pp)).length
  return validAmount
}
const checkValid = (pp) => {
  let valid = true
  const requirements = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ]
  requirements.forEach(req => {
    if (!pp[req]) {
      valid = false
    } //bomb with validation in else if
  })
  return valid
}
console.log(solution())