const fs = require('fs')

const solution = () => {
    const input = fs.readFileSync('./input.txt', 'utf-8').trim().split("\n")
    const formatted = input.map((value, i) => {
        // value: '3-4 t: dttt'
        const newInput = {
            posA: Number(value.split(' ')[0].split('-')[0]), // 3
            posB: Number(value.split(' ')[0].split('-')[1]),  // 4
            ltr: value.split(' ')[1].split(':')[0], // 't'
            pw: value.split(' ')[2] // 'dttt'
        }
        return newInput
    })
    const valid = formatted.filter(input => {
        const charA = input.pw[input.posA - 1]
        const charB = input.pw[input.posB - 1]
        return charA === charB ? false : (charA === input.ltr || charB === input.ltr) ? true : false
    })

    console.log('Answer:');
    console.log(valid.length);
}

solution()