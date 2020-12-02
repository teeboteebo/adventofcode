const fs = require('fs')

const solution = async () => {
  const input = await fs.readFileSync('./input.txt', 'utf-8').trim().split("\n")
  const formatted = input.map(i => {
    const newInput = { min: Number(i.split(' ')[0].split('-')[0]), max: Number(i.split(' ')[0].split('-')[1]), ltr: i.split(' ')[1].split(':')[0], pw: (i.split(' ')[2]) }
    return newInput
  })
  console.log(formatted.length);

  const valid = formatted.filter(input => {
    let ok = false
    const regex = new RegExp(`${input.ltr}`, 'g')
    const amtofocc = (input.pw.match(regex) || []).length
    if (amtofocc >= input.min && amtofocc <= input.max) {
      ok = true
    }
    
    return ok === true
   
  })
  console.log(valid.length);
}

solution()