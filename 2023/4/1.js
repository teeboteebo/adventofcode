const fs = require("fs");
const values = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()

const amountToPoints = (amount) => {
  if (amount === 0) return 0;
  return Math.pow(2, amount - 1);
};

const solution = () => {
  const cards = values.map((card) => {
    const winningNumbers = card
      .split(/\| +/)[0]
      .split(/: +/)[1]
      .split(/ +/)
      .map((number) => number.trim())
      .sort((a, b) => a - b);
      const ticketNumbers = card
      .split(/\| +/)[1]
      .split(/ +/)
      .map((number) => number.trim())
      .sort((a, b) => a - b);
    return { winningNumbers, ticketNumbers };
  });

  // console.log(cards);
  const result = cards.map((card) => {
    const { winningNumbers, ticketNumbers } = card;
    const ticketWinningNumbers = winningNumbers.filter((number) =>
      ticketNumbers.includes(number)
    );
    const points = amountToPoints(ticketWinningNumbers.length);
    return { ticketWinningNumbers, points };
  });
  console.log(result.map((card) => card.ticketWinningNumbers.length));
  const total = result.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  return total;
};

console.log(solution());
