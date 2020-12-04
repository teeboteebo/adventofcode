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
    } else {
      // requirement exists, check if valid
      console.log(req, validInput(pp[req], req))
      if (validInput(pp[req], req)) {
        // if input is ok, leave valid true
        return
      } else {
        valid = false
      }

    }
  })
  return valid
}
// true === input is okay
const validInput = (input, type) => {
  switch (type) {
    case 'byr':
      return validNumber(input, 1920, 2002)
      break
    case 'iyr':
      return validNumber(input, 2010, 2020)
      break
    case 'eyr':      
      return validNumber(input, 2020, 2030)
      break
    case 'hgt':
      let height = input.substr(0, input.length - 2) // input - last two chars
      const entity = input.substr(input.length - 2) // last two chars
      if (!(entity === 'cm' || entity === 'in')) return false // entity needs to be in or cm

      if (entity === 'cm' && !validNumber(height, 150, 193)) return false
      if (entity === 'in' && !validNumber(height, 59, 76)) return false
      return true
      break
    case 'hcl':
      if(input.substr(0,1) !== '#') return false
      if(input.substr(1).length !== 6) return false
      if(!input.substr(1).match(/[0-9a-fA-F]+/g)) return false
      return true

      break
    case 'ecl':
      const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      if(!validColors.includes(input)) return false
      return true

      break
    case 'pid':
      if(input.length !== 9) return false
      return true

      break
    default:
      return false
      break

  }
}
const validNumber = (val, min, max) => {
  val = Number(val)
  return val <= max && val >= min
}
console.log(solution())



// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.