import React, { useState, useEffect, useMemo } from "react";
import { Paper, Typography } from "@mui/material";
import Chart from "react-google-charts";
import countryData from "../../../data/COUNTRY_DATA";
import { shuffleArray, filterByRegion } from "../../../helpers";

const continentCodes = {
  World: "world",
  Africa: "002",
  Asia: "142",
  Europe: "150",
  "North America": "019",
  "South America": "019",
  Oceania: "009",
};

const Maps = ({ game }) => {
  const [questionNumber, setQuestionNumber] = useState(0);

  let dataRows = countryData.map((country) => {
    return [country.code, 0];
  });

  const questions = useMemo(() => {
    return shuffleArray(countryData).map((country) => {
      return { name: country.name, code: country.code, region: country.region };
    });
  }, []);

  const mapData = [["Country", "Found"], ...dataRows];

  const [data, setData] = useState(mapData);
  const [regionZoom, setRegionZoom] = useState(
    continentCodes[`${questions[questionNumber].region}`]
  );
  useEffect(() => {
    setRegionZoom(continentCodes[`${questions[questionNumber].region}`]);
  }, [questionNumber]);

  const getSelectedCountry = (chartWrapper) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;

    const region = data[selection[0].row + 1][0];
    console.log(region);
    return region;
  };

  const updateData = (selectedCountry, answerCountry) => {
    let correct = selectedCountry === answerCountry;

    let updatedData = data.map((country) => {
      if (country[0] === answerCountry) {
        return [country[0], correct ? 1 : 2];
      }
      return country;
    });
    setData(updatedData);
    setTimeout(() => {
      setQuestionNumber(questionNumber + 1);
    }, 500);
  };
  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", margin: "0 0 1rem 0" }}
      >
        {questions[questionNumber].name}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          overflow: "scroll",
          margin: "auto",
          backgroundColor: "background.default",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                updateData(
                  getSelectedCountry(chartWrapper),
                  questions[questionNumber].code
                );
              },
            },
          ]}
          chartType="GeoChart"
          style={{ margin: "auto", minWidth: "1000px", overflow: "scroll" }}
          data={data}
          options={{
            backgroundColor: {
              fill: "#81d4fa",
            },
            legend: "none",
            colorAxis: {
              colors: ["ffffe5", "#109618", "#cf1a24"],
              values: [0, 1, 2],
            },
            datalessRegionColor: "lightGray",
            defaultColor: "#ffffe5",
            region: "057",
            tooltip: { trigger: "none" },
          }}
        />
      </Paper>
    </>
  );
};

export default Maps;

//potential useful methods

//clearChart() - clears the chart
//add found countries to a list to make sure that that country isnt clicked again
//random color for each country from a list of colors, but not grey or green or whatever is used for correct and whatever is used for incorrect
