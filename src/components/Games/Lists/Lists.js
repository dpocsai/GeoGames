import React, { useState, useMemo, useEffect, useRef } from "react";
import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";

import { Typography, Box, Card, TextField, Button } from "@mui/material";

import {
  filterByRegion,
  sortCountries,
  sortByName,
  getTimeDisplay,
  cleanInputValue,
  isValidAnswer,
} from "../../../helpers";

import { deleteGame } from "../../../actions";
import GameHeader from "../GameHeader";
import GameResults from "../GameResults";
import AnswerSheet from "./AnswerSheet";

const Lists = ({ game }) => {
  const gameConfig = useMemo(() => {
    return {
      World: {
        time: game.listCategory === "Countries" ? 1200 : 600,
        listLength: 30,
      },
      Asia: {
        time: game.listCategory === "Countries" ? 600 : 300,
        listLength: 15,
      },
      Africa: {
        time: game.listCategory === "Countries" ? 600 : 300,
        listLength: 15,
      },
      Europe: {
        time: game.listCategory === "Countries" ? 600 : 300,
        listLength: 15,
      },
      Oceania: {
        time: game.listCategory === "Countries" ? 300 : 120,
        listLength: 5,
      },
      "North America": {
        time: game.listCategory === "Countries" ? 300 : 120,
        listLength: 10,
      },
      "South America": {
        time: game.listCategory === "Countries" ? 300 : 120,
        listLength: 5,
      },
    };
  }, [game.listCategory]);

  const confirm = useConfirm();
  const dispatch = useDispatch();
  const timeLeft = useRef(gameConfig[game.region].time);
  const timerId = useRef();

  const [timeDisplay, setTimeDisplay] = useState(
    getTimeDisplay(gameConfig[game.region].time)
  );
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [foundAnswers, setfoundAnswers] = useState([]);
  const [revealAnswers, setRevealAnswers] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeDisplay(getTimeDisplay(--timeLeft.current));
    }, 1000);

    timerId.current = timer;

    if (timeLeft.current === 0) {
      handleEndGame();
    }

    return () => clearInterval(timer);
  }, [timeDisplay]);

  const countryList = useMemo(() => {
    const getCountryList = (region, category) => {
      const sortRules = {
        "Largest Populations": {
          sortRule: "population",
          sortDirection: "desc",
        },
        "Largest Areas": { sortRule: "area", sortDirection: "desc" },
        "Largest Densities": { sortRule: "density", sortDirection: "desc" },
        "Smallest Populations": {
          sortRule: "population",
          sortDirection: "asc",
        },
        "Smallest Areas": { sortRule: "area", sortDirection: "asc" },
        "Smallest Densities": { sortRule: "density", sortDirection: "asc" },
      };

      let countriesInRegion = filterByRegion(region);
      if (category === "Countries") {
        return sortByName(countriesInRegion);
      }

      let countriesSortedByCategory = sortCountries(
        countriesInRegion,
        sortRules[category].sortRule,
        sortRules[category].sortDirection
      );
      return countriesSortedByCategory.slice(0, gameConfig[region].listLength);
    };

    return getCountryList(game.region, game.listCategory);
  }, [game.listCategory, game.region, gameConfig]);

  const handleExitGame = () => {
    confirm({
      description: "Game progress will be lost",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      if (window.location.href !== "http://localhost:3000/") {
        //CHANGE THIS IN PRODUCTION
        dispatch(deleteGame());
      }
    });
  };

  const handleGiveUp = () => {
    confirm({
      description: "Answers will be revealed and game will end",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      if (window.location.href !== "http://localhost:3000/") {
        //CHANGE THIS IN PRODUCTION
        handleEndGame();
      }
    });
  };

  const scrollToAnswer = (answer) => {
    let topOfAnswerList = document.getElementById("answers").offsetTop;
    let positionOfCorrectAnswer = document.getElementById(answer).offsetTop;
    document.getElementById("answers").scrollTop =
      positionOfCorrectAnswer - topOfAnswerList - 9;
  };

  const handleCorrectAnswer = (answer) => {
    document.getElementById(answer).innerText += ` ${answer}`;
    let inputBox = document.getElementById("inputBox");
    inputBox.style.color = "#729601";
    setfoundAnswers([...foundAnswers, answer]);

    setTimeout(() => {
      inputBox.style.color = "black";
      setInputValue("");
      setProgress(progress + 1);

      if (progress >= countryList.length - 1) {
        handleEndGame();
      }
    }, 300);
  };

  const handleSubmitCountry = (inputValue, setInputValue) => {
    console.log(inputValue, game.suddenDeath);
    let answer = countryList.find((country) =>
      isValidAnswer(inputValue, country, game.title)
    );
    console.log(answer, !!answer, game.suddenDeath);
    if (answer && !foundAnswers.includes(answer.name)) {
      handleCorrectAnswer(answer.name, setInputValue);
      scrollToAnswer(answer.name);
    } else if (!answer && game.suddenDeath) {
      handleEndGame();
    }
  };

  const handleEndGame = () => {
    clearInterval(timerId.current);
    setTimeDisplay((timeLeft.current = 0));
    document.getElementById("inputBox").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("submitBtn").disabled = true;
    setRevealAnswers(true);
    setOpen(true);
  };

  return (
    <>
      <Box
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto ",
          padding: "0.4rem 0",
          width: "100%",
          backgroundColor: "background.default",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">{game.listCategory}:</Typography>

        <Typography variant="h4" fontWeight="bold">
          {game.region}
        </Typography>
      </Box>
      <Card
        sx={{
          width: "90%",
          backgroundColor: "background.paper",
          margin: "auto",
          padding: "0 5px",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
        elevation={5}
      >
        <GameHeader
          score={timeDisplay}
          progress={progress}
          totalQuestions={countryList.length}
          handleExitGame={handleExitGame}
        />
        <>
          <AnswerSheet
            countryList={countryList}
            revealAnswers={revealAnswers}
            foundAnswers={foundAnswers}
          />
          <Box
            sx={{
              margin: "2rem auto",
              width: { xs: "90%", sm: "70%", md: "60%" },
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <TextField
              id="inputBox"
              variant="outlined"
              placeholder="Country"
              fullWidth
              autoFocus
              inputRef={(input) => input && input.focus()}
              spellCheck="false"
              autoCorrect="false"
              autoComplete="off"
              sx={{
                backgroundColor: "background.default",
                "& label.Mui-focused": {
                  color: "transparent",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "transparent",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              inputProps={{ maxLength: 40 }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(cleanInputValue(e.target.value));
                if (!game.suddenDeath) {
                  handleSubmitCountry(e.target.value, setInputValue);
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  document.getElementById("submitBtn").click();
                }
              }}
            />
            {game.suddenDeath ? (
              <Button
                id="submitBtn"
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  width: "25%",
                }}
                onClick={(e) => {
                  handleSubmitCountry(inputValue, setInputValue);
                }}
              >
                Enter
              </Button>
            ) : null}
          </Box>
          <Button
            id="giveUpBtn"
            size="small"
            sx={{
              width: "25%",
              color: "gray",
              fontSize: "10px",
              margin: "0 auto 1rem auto",
            }}
            onClick={() => {
              handleGiveUp();
            }}
          >
            Give Up
          </Button>
        </>
      </Card>
      <GameResults
        open={open}
        setOpen={setOpen}
        game={{ ...game, questions: countryList.length }}
        score={progress}
      />
    </>
  );
};

export default Lists;
