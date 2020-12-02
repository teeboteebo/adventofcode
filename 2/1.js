const fs = require('fs')

const solution = () => {
  const input = fs.readFileSync('./input.txt', 'utf-8').trim().split("\n")
  const formatted = input.map(value => {
    // value: '3-4 t: dttt'
    const newInput = {
      min: Number(value.split(' ')[0].split('-')[0]), // 3
      max: Number(value.split(' ')[0].split('-')[1]), // 4
      ltr: value.split(' ')[1].split(':')[0], // 't'
      pw: value.split(' ')[2] // 'dttt'
    }
    return newInput
  })
  const valid = formatted.filter(input => {
    const regex = new RegExp(`${input.ltr}`, 'g')
    const ltrOccurences = (input.pw.match(regex) || []).length
    if (ltrOccurences >= input.min && ltrOccurences <= input.max) {
      return true
    } else return false   
  })
  console.log('Answer:');
  console.log(valid.length);
}

solution()