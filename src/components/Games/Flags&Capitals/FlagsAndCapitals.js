import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { Card } from "@mui/material";

import {
  filterByRegion,
  shuffleArray,
  getMultipleChoiceOptions,
  isValidAnswer,
} from "../../../helpers";

import { deleteGame } from "../../../actions";
import MultipleChoice from "../MultipleChoice";
import TypeAnswer from "../TypeAnswer";
import GameHeader from "../GameHeader";
import GameResults from "../GameResults";

const FlagsAndCapitals = ({ game }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(1);
  const [open, setOpen] = useState(false);

  const countryList = useMemo(() => {
    let shuffledCountries = shuffleArray(filterByRegion(game.region));
    if (game.mode === "Multiple Choice") {
      return shuffledCountries.map((country) => ({
        ...country,
        mcChoices: getMultipleChoiceOptions(country, shuffledCountries),
      }));
    }
    return shuffledCountries;
  }, [game.region, game.mode]);

  const handleExitGame = () => {
    confirm({
      description: "Game progress will be lost",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      dispatch(deleteGame());
    });
  };

  const handleSubmitAnswer_MC = (inputValue, country, currentSelection) => {
    let correct =
      game.title === "Flags"
        ? inputValue === country.name
        : inputValue === country.capital;

    if (correct) {
      currentSelection.style.backgroundColor = "#729601";
      setTimeout(() => {
        currentSelection.style.backgroundColor = "#ffffe5";
        setScore(score + 1);
        if (progress >= game.questions) {
          setOpen(true);
          return;
        }
        setProgress(progress + 1);
      }, 500);
    } else {
      let correctChoice = document.getElementById("correct");
      correctChoice.style.backgroundColor = "#729601";

      setTimeout(() => {
        correctChoice.style.backgroundColor = "#ffffe5";
        if (progress >= game.questions) {
          setOpen(true);
          return;
        }
        setProgress(progress + 1);
      }, 1000);
    }
  };

  const handleSubmitAnswer_Input = (
    inputValue,
    country,
    inputBox,
    setInputValue
  ) => {
    let correct = isValidAnswer(inputValue, country, game.title);

    if (correct) {
      inputBox.style.backgroundColor = "#729601";
      inputBox.value = game.title === "Flags" ? country.name : country.capital;
      setTimeout(() => {
        inputBox.style.backgroundColor = "#e4f0e2";
        setScore(score + 1);
        setInputValue("");
        if (progress >= game.questions) {
          setOpen(true);
          return;
        }
        setProgress(progress + 1);
      }, 500);
    } else {
      inputBox.style.backgroundColor = "#ff7961";
      inputBox.value = game.title === "Flags" ? country.name : country.capital;
      setTimeout(() => {
        setInputValue("");
        inputBox.style.backgroundColor = "#e4f0e2";
        if (progress >= game.questions) {
          setOpen(true);
          return;
        }
        setProgress(progress + 1);
      }, 1000);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "90%",
          backgroundColor: "background.paper",
          margin: "auto",
          padding: "0 5px",
          maxWidth: "700px",
        }}
        elevation={5}
      >
        <GameHeader
          score={score}
          progress={progress}
          totalQuestions={game.questions}
          handleExitGame={handleExitGame}
        />
        {game.mode === "Multiple Choice" ? (
          <MultipleChoice
            country={countryList[progress - 1]}
            handleSubmitAnswer_MC={handleSubmitAnswer_MC}
            gameTitle={game.title}
          />
        ) : (
          <TypeAnswer
            country={countryList[progress - 1]}
            handleSubmitAnswer_Input={handleSubmitAnswer_Input}
            gameTitle={game.title}
          />
        )}
      </Card>
      <GameResults open={open} setOpen={setOpen} game={game} score={score} />
    </>
  );
};

export default FlagsAndCapitals;

//for typed answer, perhaps have two buttons. One to submit - which only allows unlimitting submit attempts until correct, and skip which goes on to the next question if the user gives up.
//Currently if user mistypes answer by more than 1 spelling difference (ex. mozambique and mozembiqe), it will not count the answer
