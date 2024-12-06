const generateAll = (str) => {
  const result= [];
  const helper = (str, i) => {
    if (i === str.length) {
      result.push(str);
      return;
    }
    if (str[i] === "?") {
      helper(str.slice(0, i) + "." + str.slice(i + 1), i + 1);
      helper(str.slice(0, i) + "#" + str.slice(i + 1), i + 1);
    } else {
      helper(str, i + 1);
    }
  };
  helper(str, 0);
  return result;
}
const generateAll2 = (qMarks) => {
  const result= [];
  const helper = (str, index) => {
    if (index === qMarks.length) {
      result.push(str);
      return;
    }
    if (qMarks[index] === '?') {
      helper(str + '.', index + 1);
      helper(str + '#', index + 1);
    } else {
      helper(str + qMarks[index], index + 1);
    }
  };
  helper('', 0);
  return result;
}
console.log(generateAll("##.#????#."));
console.log(generateAll2("##.#????#."));

