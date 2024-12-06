// This is part 2- part 1 is gone

const fs = require("fs");
const reports = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n")
  .map((string) => string.split("\n"))
  .flat()
  .map((string) => string.split(" ").map(Number));

const solution = () => {
  const safeReports = reports.filter((report) => {
    // report: [1,3,5]
    // reports that are safe, differ no bigger than 3 between each number in the specified order
    let safe = true;
    console.log("---");
    console.log(report);
    const sortedAsc = [...report].sort((a, b) => a - b);
    const sortedDesc = [...report].sort((a, b) => b - a);
    // json stringify to compare arrays
    if (
      JSON.stringify(sortedAsc) !== JSON.stringify(report) &&
      JSON.stringify(sortedDesc) !== JSON.stringify(report)
    ) {
      safe = false;
      console.log("one sort does not match");
    }
    if (safe) {
      for (let i = 0; i < report.length - 1; i++) {
        console.log(
          `checking ${report[i]} - ${report[i + 1]}, diff: ${Math.abs(
            report[i] - report[i + 1]
          )}`
        );
        if (
          Math.abs(report[i] - report[i + 1]) > 3 ||
          Math.abs(report[i] - report[i + 1]) === 0
        ) {
          safe = false;
          break;
        }
      }
    }
    console.log(`is safe: ${safe}`);
    return safe;
  });

  return safeReports.length;
};
console.log("after", solution());
