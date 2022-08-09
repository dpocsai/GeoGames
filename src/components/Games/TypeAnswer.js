import React, { useState, useRef } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const TypeAnswer = ({ country, handleSubmitAnswer_Input, gameTitle }) => {
  const [inputValue, setInputValue] = useState("");
  const submitBtn = useRef();

  const cleanInputValue = (value) => {
    return value
      .replace(/ +/g, " ")
      .replace(/-+/g, "-")
      .replace(/[^a-zA-Z -]/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());
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
            <Box component="img" height="75px" src={country.flag} />
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontSize: { sm: "36px", md: "44px" } }}
            >
              {country.name}
            </Typography>
          </Box>
        )}
      </Paper>
      <Box
        sx={{
          margin: "2rem auto",
          width: { xs: "90%", md: "70%", lg: "60%" },
          display: "flex",
          gap: "5%",
          alignItems: "center",
        }}
      >
        <TextField
          id="inputBox"
          variant="outlined"
          fullWidth
          autoFocus
          inputRef={(input) => input && input.focus()}
          spellCheck="false"
          autoCorrect="false"
          autoComplete="off"
          sx={{
            backgroundColor: "background.default",
          }}
          inputProps={{ maxLength: 40 }}
          value={inputValue}
          onChange={(e) => setInputValue(cleanInputValue(e.target.value))}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              submitBtn.current.click();
            }
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "20%",
            padding: "0.5rem",
          }}
          ref={submitBtn}
          onClick={() => {
            let inputBox = document.getElementById("inputBox");
            handleSubmitAnswer_Input(
              inputValue,
              country,
              inputBox,
              setInputValue
            );
          }}
        >
          Enter
        </Button>
      </Box>
    </>
  );
};

export default TypeAnswer;
