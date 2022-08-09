import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

import { filterByRegion, filterSmallCountries } from "../../helpers";
import { CloseRounded } from "@mui/icons-material";
import { createGame } from "../../actions";

const GameSetup = ({ title, options = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gameData, setGameData] = useState({
    title,
    mode: options[0],
    region: "World",
    questions: 10,
    listCategory: "Countries",
    suddenDeath: false,
  });

  const regions =
    title === "Maps"
      ? ["World", "Africa", "Asia", "Europe", "Oceania", "Americas"]
      : [
          "World",
          "Africa",
          "Asia",
          "Europe",
          "Oceania",
          "North America",
          "South America",
        ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(gameData));
  };

  const renderQuestionsOptions = (region) => {
    let maxQuestions =
      title === "Maps"
        ? filterSmallCountries(region).length
        : filterByRegion(region).length;

    let questions = [10, 25, 50, maxQuestions];
    let questionOptions = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i] > maxQuestions) {
        questionOptions[i] = maxQuestions;
        break;
      }
      questionOptions[i] = questions[i];
    }
    return questionOptions.map((questionOption, idx) => {
      return (
        <MenuItem value={questionOption} key={idx + 1}>
          {questionOption}
        </MenuItem>
      );
    });
  };

  const renderModeOptions = (options) => {
    return options.map((option, idx) => {
      return (
        <FormControlLabel
          key={idx}
          value={option}
          control={<Radio size="small" />}
          label={<Typography variant="overline">{option}</Typography>}
        />
      );
    });
  };

  const renderListCategoryOptions = () => {
    let listCategories = [
      "Countries",
      "Largest Populations",
      "Largest Areas",
      "Largest Densities",
      "Smallest Populations",
      "Smallest Areas",
      "Smallest Densities",
    ];
    return listCategories.map((listCategory, idx) => {
      return (
        <MenuItem value={listCategory} key={idx + 1}>
          {listCategory}
        </MenuItem>
      );
    });
  };

  return (
    <Container>
      <Card
        elevation={5}
        sx={{
          borderRadius: "10px",
          width: { sm: "80%", xs: "90%", md: "50%" },
          margin: "auto",
          padding: "3%",
          backgroundColor: "background.paper",
          backgroundImage: "none",
        }}
      >
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <CloseRounded
            sx={{
              cursor: "pointer",
              color: "text",
              fontSize: "25px",
            }}
          />
        </IconButton>

        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="overline"
            fontSize="24px"
            textTransform="uppercase"
          >
            {title}
          </Typography>
          <FormControl sx={{ width: "80%", margin: "5% 0" }}>
            <InputLabel id="region-select">
              <Typography variant="overline">Region</Typography>
            </InputLabel>
            <Select
              id="region-select"
              value={gameData.region}
              onChange={(e) => {
                setGameData({
                  ...gameData,
                  region: e.target.value,
                  questions: 10,
                });
              }}
              label={<Typography variant="overline">Region</Typography>}
              MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
            >
              {regions.map((region, idx) => {
                return (
                  <MenuItem value={region} key={idx + 1}>
                    {region}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {title === "Lists" ? (
            <FormControl sx={{ width: "80%", margin: "5% 0" }}>
              <InputLabel id="listCategory-select">
                <Typography variant="overline">Category</Typography>
              </InputLabel>
              <Select
                id="listCategory-select"
                value={gameData.listCategory}
                onChange={(e) => {
                  setGameData({
                    ...gameData,
                    listCategory: e.target.value,
                  });
                }}
                label={<Typography variant="overline">Category</Typography>}
                MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
              >
                {renderListCategoryOptions()}
              </Select>
            </FormControl>
          ) : (
            <FormControl sx={{ width: "80%", margin: "5% 0" }}>
              <InputLabel id="questions-select">
                <Typography variant="overline">Questions</Typography>
              </InputLabel>
              <Select
                id="questions-select"
                value={gameData.questions}
                onChange={(e) => {
                  setGameData({
                    ...gameData,
                    questions: e.target.value,
                  });
                }}
                label={<Typography variant="overline">Questions</Typography>}
                MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
              >
                {renderQuestionsOptions(gameData.region)}
              </Select>
            </FormControl>
          )}
          {title === "Lists" ? null : (
            <RadioGroup
              key={title}
              row
              name="mode"
              sx={{
                width: "80%",
                margin: "0 auto 5% auto",
              }}
              value={gameData.mode}
              onChange={(e) => {
                setGameData({
                  ...gameData,
                  mode: e.target.value,
                });
              }}
            >
              {renderModeOptions(options)}
            </RadioGroup>
          )}
          {title === "Lists" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={gameData.suddenDeath}
                  onChange={(e) => {
                    setGameData({
                      ...gameData,
                      suddenDeath: e.target.checked,
                    });
                  }}
                />
              }
              label="Sudden Death"
            />
          ) : null}

          <Button
            variant="contained"
            className="submitButton"
            type="submit"
            sx={{
              margin: "5% 0",
              padding: "0.5rem 0",
              width: "40%",
            }}
          >
            Play
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default GameSetup;
