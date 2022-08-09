import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import { deleteGame } from "../../actions";

const GameResults = ({ open, setOpen, game, score }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { title, questions, mode, region, listCategory } = game;

  const handlePlayAgain = () => {
    dispatch(deleteGame());
    setOpen(false);
    navigate(`/${title}`);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);

        if (title !== "Lists") {
          navigate(`/`);
        }
      }}
      sx={{
        width: "90%",
        height: "90%",
        margin: "5% auto",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          borderRadius: "10px",
          width: { sm: "80%", xs: "90%", md: "50%" },
          margin: 0,
          padding: "1rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          msTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.default",
        }}
      >
        <IconButton
          onClick={() => {
            setOpen(false);
            if (title !== "Lists") {
              navigate(`/`);
            }
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            padding: "1rem",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
          >{`${region} ${title}`}</Typography>
          <Typography variant="h6">{mode || listCategory}</Typography>
          <Typography variant="h5">{`${score} / ${questions}`}</Typography>
          <Button
            variant="contained"
            sx={{
              width: { xs: "60%", sm: "40%" },
            }}
            onClick={() => {
              handlePlayAgain(game);
            }}
          >
            Play again
          </Button>
          {title === "Lists" ? (
            <Button
              size="small"
              sx={{
                width: "50%",
                color: "gray",
                fontSize: "10px",
              }}
              onClick={() => {
                setOpen(false);
                if (title !== "Lists") {
                  navigate(`/`);
                }
              }}
            >
              View Answers
            </Button>
          ) : null}
        </Box>
      </Paper>
    </Modal>
  );
};

export default GameResults;

//share button at the bottom middle to send a pic and a link to the game?
