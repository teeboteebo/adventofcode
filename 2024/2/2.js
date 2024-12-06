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
    return (
      reportIsSafe(report) ||
      report.some((_, i) => {
        const reportWithOutValue = [...report];
        reportWithOutValue.splice(i, 1);
        return reportIsSafe(reportWithOutValue);
      })
    );
  });

  return safeReports.length;
};

const reportIsSafe = (report) => {
  let safe = true;

  const sortedAsc = [...report].sort((a, b) => a - b);
  const sortedDesc = [...report].sort((a, b) => b - a);

  if (
    JSON.stringify(sortedAsc) !== JSON.stringify(report) &&
    JSON.stringify(sortedDesc) !== JSON.stringify(report)
  ) {
    safe = false;
    return safe;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const diff = Math.abs(report[i] - report[i + 1]);
    if (
      diff > 3 ||
      diff === 0
    ) {
      safe = false;
      break;
    }
  }

  return safe;
};
console.log("after", solution());
