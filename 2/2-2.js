const fs = require('fs')

const solution = async () => {
    const input = await fs.readFileSync('./input.txt', 'utf-8').trim().split("\n")
    const formatted = input.map(i => {
        const newInput = { min: Number(i.split(' ')[0].split('-')[0]), max: Number(i.split(' ')[0].split('-')[1]), ltr: i.split(' ')[1].split(':')[0], pw: (i.split(' ')[2]) }
        return newInput
    })
    console.log(formatted.length);

    const valid = formatted.filter(input => {
        const charA = input.pw[input.min - 1]
        const charB = input.pw[input.max - 1]

        if (charA === charB) {
            return false
        } else if (charA === input.ltr || charB === input.ltr) {
            return true
        } else return false
    })
    console.log(valid.length);
}

solution()