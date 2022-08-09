const levenshtein = require("js-levenshtein");

const getSpellingDifference = (str1, str2) => {
  str1 = str1
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z]/g, "");
  str2 = str2
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z]/g, "");

  return levenshtein(str1, str2);
};

module.exports = getSpellingDifference;
