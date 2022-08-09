import React, { useState, useMemo, useEffect } from "react";
import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";

import { Paper, Typography, Box, Card, Fab } from "@mui/material";
import {
  UnfoldMore,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { filterByRegion, shuffleArray, formatNumber } from "../../../helpers";
import { deleteGame } from "../../../actions";
import GameHeader from "../GameHeader";
import GameResults from "../GameResults";

const HighLow = ({ game }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(1);
  const [displayNumber, setDisplayNumber] = useState("");

  const countryList = useMemo(() => {
    let shuffledCountries = shuffleArray(filterByRegion(game.region));

    return shuffledCountries;
  }, [game.region]);

  useEffect(() => {
    return () => {
      setDisplayNumber("");
    };
  }, [progress]);

  const handleExitGame = () => {
    confirm({
      description: "Game progress will be lost",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      dispatch(deleteGame());
    });
  };

  const getDataUnit = (gameMode) => {
    if (gameMode === "Population") {
      return "";
    }
    return gameMode === "Area" ? `km${"\u00B2"}` : `pop/km${"\u00B2"}`;
  };

  const handleBtnClick = (btn) => {
    let stat = game.mode.toLowerCase();

    let correct =
      btn === "higher"
        ? countryList[progress][stat] >= countryList[progress - 1][stat]
        : countryList[progress][stat] <= countryList[progress - 1][stat];

    setDisplayNumber(
      ` ${formatNumber(
        countryList[progress][game.mode.toLowerCase()]
      )} ${getDataUnit(game.mode)}`
    );

    document.getElementById("questionBox").style.borderColor = correct
      ? "#729601"
      : "#ff7961";

    setTimeout(() => {
      setScore(correct ? score + 1 : score);
      document.getElementById("questionBox").style.borderColor = "#e4f0e2";

      if (progress >= game.questions) {
        setOpen(true);
        return;
      }
      setProgress(progress + 1);
    }, 1000);
  };

  return (
    <>
      <Card
        sx={{
          width: "90%",
          backgroundColor: "background.paper",
          margin: "auto",
          padding: "1rem",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              width: { xs: "95%", md: "70%", lg: "60%" },
              minHeight: { xs: 150, sm: 200, md: 250 },
              backgroundColor: "background.default",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "75px",
              }}
              src={countryList[progress - 1].flag}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "24px", md: "30px" },
              }}
              fontWeight="bold"
            >
              {countryList[progress - 1].name}
            </Typography>

            <Typography fontSize="16px">
              {`${game.mode}: ${formatNumber(
                countryList[progress - 1][game.mode.toLowerCase()]
              )} ${getDataUnit(game.mode)}`}
            </Typography>
          </Paper>
          <UnfoldMore />
          <Paper
            id="questionBox"
            elevation={5}
            sx={{
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              justifyContent: "center",
              alignItems: "center",
              border: "4px solid transparent",
              margin: "0 auto",
              width: { xs: "95%", md: "70%", lg: "60%" },
              minHeight: { xs: 150, sm: 200, md: 250 },
              backgroundColor: "background.default",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "75px",
              }}
              src={countryList[progress].flag}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "24px", md: "30px" },
              }}
              fontWeight="bold"
            >
              {countryList[progress].name}
            </Typography>

            <Typography
              fontSize="14px"
              id="displayNumber"
            >{`${game.mode}:${displayNumber}`}</Typography>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Fab
                variant="extended"
                size="medium"
                sx={{
                  backgroundColor: "background.paper",

                  "&:hover": {
                    backgroundColor: "#c9d79e",
                  },
                }}
                onClick={() => {
                  handleBtnClick("lower");
                }}
              >
                <Typography variant="overline">Lower</Typography>
                <KeyboardArrowDown />
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                sx={{
                  backgroundColor: "background.paper",

                  "&:hover": {
                    backgroundColor: "#c9d79e",
                  },
                }}
                onClick={() => {
                  handleBtnClick("higher");
                }}
              >
                <Typography variant="overline">Higher</Typography>
                <KeyboardArrowUp />
              </Fab>
            </Box>
          </Paper>
        </Box>
      </Card>
      <GameResults open={open} setOpen={setOpen} game={game} score={score} />
    </>
  );
};

export default HighLow;
