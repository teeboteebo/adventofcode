const fs = require('fs')
const values = fs.readFileSync('./input.txt', 'utf-8').split('\n\n').map((row) => row.trim().replace('\n', ' '));

const solution = () => {
  const passports = values.map(val => {
    val = val.replace(/[\n\r]/g, ' ')
    return val
  })
  const formattedPassports = passports.map(pp => {
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
  console.log('-----');
  console.log(pp);
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
      console.log(req + ' is missing, setting false');
      valid = false
    } //bomb with validation in else if
  })
  console.log('-----');
  return valid
}
console.log(solution())