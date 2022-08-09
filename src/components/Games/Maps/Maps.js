import React, { useState, useMemo } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Chart from "react-google-charts";
import countryData from "../../../data/COUNTRY_DATA";
import { shuffleArray, filterSmallCountries } from "../../../helpers";
import GameHeader from "../GameHeader";
import GameResults from "../GameResults";

const regionCodes = {
  World: "world",
  Africa: "002",
  "North Africa": "015",
  "West Africa": "011",
  "Central Africa": "017",
  "East Africa": "014",
  "Southern Africa": "018",
  Asia: "142",
  "Central Asia": "143",
  "East Asia": "030",
  "South Asia": "034",
  "South-East Asia": "035",
  "West Asia": "145",
  Europe: "150",
  "North Europe": "154",
  "West Europe": "155",
  "East Europe": "151",
  "South Europe": "039",
  Americas: "019",
  "North America": "021",
  "Caribbean America": "029",
  "Central America": "013",
  "South America": "005",
  Oceania: "009",
};

const mainRegions = [
  "World",
  "Europe",
  "Africa",
  "Asia",
  "Americas",
  "Oceania",
];

const Maps = ({ game }) => {
  const [open, setOpen] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [regionView, setRegionView] = useState(game.region);
  const [foundCountries, setFoundCountries] = useState([]);
  const [confirmCountry, setConfirmCountry] = useState(null);

  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(1);

  let dataRows = countryData.map((country) => {
    return [country.code, 0];
  });

  const questions = useMemo(() => {
    let _questions = shuffleArray(filterSmallCountries(game.region)).map(
      (country) => {
        return {
          name: country.name,
          code: country.code,
          region: country.region,
        };
      }
    );
    if (game.questions > _questions.length) {
      game.questions = _questions.length;
    }
    return _questions.slice(0, game.questions);
  }, [game]);

  const mapData = [["Country", "Found"], ...dataRows];

  const [data, setData] = useState(mapData);

  const getSelectedCountry = (chartWrapper) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();

    if (selection.length === 0) return;

    const region = data[selection[0].row + 1][0];

    return region;
  };

  const confirmSelectedCountry = (selectedCountry, answerCountry) => {
    if (foundCountries.includes(selectedCountry)) {
      return;
    }

    if (!confirmCountry || confirmCountry !== selectedCountry) {
      let updatedData = data.map((country) => {
        if (country[1] === 3) {
          return [country[0], 0];
        }
        if (country[0] === selectedCountry) {
          return [country[0], 3];
        }
        return country;
      });
      setData(updatedData);
      setConfirmCountry(selectedCountry);
      return;
    }

    if (confirmCountry) {
      updateData(selectedCountry, answerCountry);
      return;
    }
  };
  const updateData = (selectedCountry, answerCountry) => {
    console.log(progress, game.questions);
    let correct = selectedCountry === answerCountry;

    let updatedData = data.map((country) => {
      if (country[0] === answerCountry) {
        setConfirmCountry(null);
        return [country[0], correct ? 1 : 2];
      }
      if (country[1] === 3) {
        return [country[0], 0];
      }

      return country;
    });
    if (correct) {
      setScore(score + 1);
    }
    setData(updatedData);
    setConfirmCountry(null);
    setFoundCountries([...foundCountries, answerCountry]);
    setQuestionNumber(questionNumber + 1);
    if (progress >= questions.length) {
      setOpen(true);
      return;
    }
    setProgress(progress + 1);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          maxWidth: "1000px",
          margin: "0.5rem auto",
        }}
      >
        <GameHeader
          score={score}
          progress={progress}
          totalQuestions={questions.length}
          handleExitGame={null}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
          }}
        >
          <Typography
            variant={`${window.innerWidth < 1000 ? "h5" : "h4"}`}
            sx={{ textAlign: "center" }}
          >
            {questions[questionNumber]?.name}
          </Typography>
          <FormControl size="small" sx={{ width: { xs: "40%", md: "15%" } }}>
            <InputLabel id="region-select">
              <Typography variant="overline">Region</Typography>
            </InputLabel>
            <Select
              id="region-select"
              value={regionView}
              onChange={(e) => {
                setRegionView(e.target.value);
              }}
              label={<Typography variant="overline">Region</Typography>}
              MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
            >
              {Object.keys(regionCodes)
                .filter((region) => {
                  if (game.region === "World") {
                    return true;
                  }
                  return region.includes(
                    game.region.slice(0, game.region.length - 1)
                  );
                })
                .map((region, idx) => {
                  return (
                    <MenuItem
                      value={region}
                      key={idx + 1}
                      sx={{
                        fontWeight: `${
                          mainRegions.includes(region) ? "700" : "400"
                        }`,
                      }}
                    >
                      {region}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "90%",
          overflow: "scroll",
          margin: "auto",
          backgroundColor: "transparent",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "70vh",
        }}
      >
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                let selectedCountry = getSelectedCountry(chartWrapper);
                let answerCountry = questions[questionNumber].code;

                confirmSelectedCountry(selectedCountry, answerCountry);
              },
            },
          ]}
          chartType="GeoChart"
          style={{
            minWidth: "1000px",
            overflow: "scroll",
            margin: "auto",
          }}
          data={data}
          options={{
            backgroundColor: {
              fill: "#81d4fa",
            },
            legend: "none",
            colorAxis: {
              colors: ["#e4f0e2", "#109618", "#cf1a24", "#fdcb58"],
              values: [0, 1, 2, 3],
            },
            datalessRegionColor: "darkGray",
            defaultColor: "#e4f0e2",
            region: `${regionCodes[regionView]}`,
            tooltip: { trigger: "none" },
          }}
        />
      </Paper>
      <GameResults
        open={open}
        setOpen={setOpen}
        game={{ ...game, questions: questions.length }}
        score={score}
      />
    </>
  );
};

export default Maps;

//potential useful methods

//clearChart() - clears the chart
//add found countries to a list to make sure that that country isnt clicked again
//random color for each country from a list of colors, but not grey or green or whatever is used for correct and whatever is used for incorrect
//highlight country when clicked with a confirm box to make sure they meant to tap that country?

//add sub-regioncode to particular countries. switch to subregion depending on the question,maybe go in order? like all carribean, then all north america etc. NO OCEANIA
//NO COUNTRIES UNDER 10,000 sq km
//AMERICAS
/*
North america - 021
Central america - 013
carribean - 029
South America - 005

ASIA
southern asia -034
south-east - 035


*/
