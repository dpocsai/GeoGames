import { Paper, Typography, Grid } from "@mui/material";

const AnswerSheet = ({ countryList, revealAnswers, foundAnswers }) => {
  const generateList = () => {
    return countryList.map((country, idx) => {
      return (
        <Grid
          item
          key={idx}
          xs={5}
          sx={{
            borderBottom: "1px solid #c9d79e",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: {
                xs: "10px",
                sm: "12px",
              },
            }}
          >
            {`${idx + 1}: `}
            <Typography
              variant="overline"
              id={country.name}
              sx={{
                fontSize: {
                  xs: "10px",
                  sm: "12px",
                  color: `${
                    foundAnswers.includes(country.name) ? "black" : "grey"
                  }`,
                  fontWeight: `${
                    foundAnswers.includes(country.name) ? "800" : "500"
                  }`,
                },
              }}
            >
              {revealAnswers ? country.name : ""}
            </Typography>
          </Typography>
        </Grid>
      );
    });
  };

  return (
    <Paper
      elevation={3}
      id="answers"
      sx={{
        width: "90%",
        margin: "auto",
        padding: "1rem 0.5rem",
        overflow: "scroll",
        backgroundColor: "background.default",
        borderRadius: "5px",
        height: { xs: "25vh", sm: "30vh" },
      }}
    >
      <Grid container rowSpacing={0} columnSpacing={2} direction="column">
        {generateList()}
      </Grid>
    </Paper>
  );
};

export default AnswerSheet;
