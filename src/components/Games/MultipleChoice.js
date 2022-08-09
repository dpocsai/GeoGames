import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const MultipleChoice = ({ country, handleSubmitAnswer_MC, gameTitle }) => {
  const renderChoices = (country) => {
    return country.mcChoices.map((choice) => {
      return (
        <Paper
          elevation={3}
          id={choice.correct ? "correct" : ""}
          key={gameTitle === "Flags" ? choice.name : choice.capital}
          sx={{
            padding: "8px",
            textAlign: "center",
            cursor: "pointer",

            "&:hover": {
              backgroundColor: "background.default",
            },
            transition: "all .2s ease",
          }}
          onClick={(e) =>
            handleSubmitAnswer_MC(e.target.innerText, country, e.target)
          }
        >
          {gameTitle === "Flags" ? choice.name : choice.capital}
        </Paper>
      );
    });
  };
  return (
    <>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto 5% auto",
          width: { xs: "95%", md: "70%", lg: "60%" },
          minHeight: { xs: 200, sm: 300, md: 350 },
          backgroundColor: "background.default",
        }}
      >
        {gameTitle === "Flags" ? (
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 150, sm: 250, md: 300 },
              maxWidth: { xs: 200, sm: 300, md: 350, lg: 450 },
            }}
            src={country.flag}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "75px",
              }}
              src={country.flag}
            />
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {country.name}
            </Typography>
          </Box>
        )}
      </Paper>
      <Box
        sx={{ margin: "5% auto", width: { xs: "90%", md: "70%", lg: "60%" } }}
      >
        <Stack spacing={2}>{renderChoices(country)}</Stack>
      </Box>
    </>
  );
};

export default MultipleChoice;
