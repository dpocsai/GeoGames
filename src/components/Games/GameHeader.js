import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { ArrowBackTwoTone } from "@mui/icons-material";

const GameHeader = ({ score, progress, totalQuestions, handleExitGame }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <ArrowBackTwoTone
          sx={{
            cursor: "pointer",
            fontSize: "30px",
            color: "text.secondary",
          }}
          onClick={() => handleExitGame()}
        />
      </Box>

      <Typography variant="h5" color="text.secondary" fontWeight="bold">
        {score}
      </Typography>
      <Box sx={{ display: "flex", width: "40%", alignItems: "center" }}>
        <Typography variant="caption" color="text.secondary">
          {progress}
        </Typography>
        <Box sx={{ width: "100%", margin: "0 5px" }}>
          <LinearProgress
            variant="determinate"
            value={Math.round((progress / totalQuestions) * 100)}
            sx={{
              height: "10px",
              borderRadius: "3px",
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {totalQuestions}
        </Typography>
      </Box>
    </Box>
  );
};

export default GameHeader;
