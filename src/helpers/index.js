import countryData from "../data/COUNTRY_DATA";
import getSpellingDifference from "./getSpellingDifference";

export const sortByPopulation = (countries, population) => {
  return countries.sort((a, b) => b[population] - a[population]);
};

export const sortBySize = (countries, size) => {
  return countries.sort((a, b) => b[size] - a[size]);
};

export const sortByDensity = (countries, density) => {
  return countries.sort((a, b) => b[density] - a[density]);
};

export const sortByName = (countries) => {
  return countries.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortCountries = (countries, category, direction = "desc") => {
  let sortedCountries = countries.sort((a, b) => b[category] - a[category]);
  return direction === "desc" ? sortedCountries : sortedCountries.reverse();
};

export const filterByRegion = (region) => {
  return region === "World"
    ? countryData
    : countryData.filter((country) => country.region === region);
};

export const filterSmallCountries = (region) => {
  let countries;
  if (region === "Americas") {
    countries = [
      ...filterByRegion("North America"),
      ...filterByRegion("South America"),
    ];
  } else {
    countries = filterByRegion(region);
  }
  return countries.filter((country) => country.area >= 9251);
};

export const compareCountriesBy = (country1, country2, attribute) =>
  country1[attribute] > country2[attribute] ? country1 : country2;

export const findCountry = (name) =>
  countryData.find((country) => country.name === name);

export const shuffleArray = (array) => {
  let currentIdx = array.length;
  let randomIdx;
  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;
    [array[currentIdx], array[randomIdx]] = [
      array[randomIdx],
      array[currentIdx],
    ];
  }
  return array;
};

export const getMultipleChoiceOptions = (country, countryList) => {
  if (countryList.length === 197) {
    countryList = countryList.filter((c) => c.region === country.region);
  }
  let choices = [{ ...country, correct: true }];
  let options = countryList.filter((c) => c.name !== country.name);
  for (let i = 1; i < 4; i++) {
    let randomIdx = Math.floor(Math.random() * options.length);
    choices[i] = options[randomIdx];
    options.splice(randomIdx, 1);
  }

  return shuffleArray(choices);
};

export const formatNumber = (number) => {
  let formattedNumber = [];
  String(number)
    .split("")
    .reverse()
    .forEach((digit, idx) => {
      if (idx % 3 === 0 && idx !== 0) {
        formattedNumber.push(",");
      }
      formattedNumber.push(digit);
    });
  return formattedNumber.reverse().join("");
};

export const getTimeDisplay = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const cleanInputValue = (value) => {
  return value
    .replace(/ +/g, " ")
    .replace(/-+/g, "-")
    .replace(/[^a-zA-Z -]/g, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const isValidAnswer = (inputValue, country, gameTitle) => {
  const MAX_SPELLING_DIFFERENCE = inputValue.length < 10 ? 0 : 1;
  let acceptedAnswers = ["Flags", "Lists"].includes(gameTitle)
    ? [country.name, ...country.otherNames]
    : [country.capital, ...country.otherCapitals];

  for (let acceptedAnswer of acceptedAnswers) {
    if (
      getSpellingDifference(inputValue, acceptedAnswer) <=
      MAX_SPELLING_DIFFERENCE
    ) {
      return true;
    }
  }
  return false;
};

// const isValidAnswer = (answer, country) => {
//   const MAX_SPELLING_DIFFERENCE = answer.length < 10 ? 0 : 1;
//   let acceptedAnswers = ["Flags", "Lists"].includes(game.title)
//     ? [country.name, ...country.otherNames]
//     : [country.capital, ...country.otherCapitals];

//   for (let acceptedAnswer of acceptedAnswers) {
//     if (
//       getSpellingDifference(answer, acceptedAnswer) <= MAX_SPELLING_DIFFERENCE
//     ) {
//       return true;
//     }
//   }
//   return false;
// };
