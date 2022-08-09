import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography } from "@mui/material";
import {
  ImportExportTwoTone,
  FlagTwoTone,
  MapTwoTone,
  StarTwoTone,
  FormatListNumberedTwoTone,
  TravelExploreTwoTone,
} from "@mui/icons-material";
import useStyles from "./styles";

import { deleteGame } from "../../actions";

const games = [
  {
    name: "Flags",
    description: "Given a flag - guess the correct country",
    link: "/flags",
    icon: (
      <FlagTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
  {
    name: "Capitals",
    description: "Given a country - guess its capital city",
    link: "/capitals",
    icon: (
      <StarTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
  {
    name: "HighLow",
    description: "Two countries - pick high/low for a stat",
    link: "/highlow",
    icon: (
      <ImportExportTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
  {
    name: "Lists",
    description: "List countries for a given region and category",
    link: "/lists",
    icon: (
      <FormatListNumberedTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
  {
    name: "Maps",
    description: "Find the location of countries on a map",
    link: "/maps",
    icon: (
      <MapTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
  {
    name: "Lookup",
    description: "Sortable table of data for every country",
    link: "/lookup",
    icon: (
      <TravelExploreTwoTone
        sx={{
          fontSize: { xs: "30px", md: "60px" },
          color: "primary.dark",
        }}
      />
    ),
  },
];

const GamesMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(deleteGame());
    };
  });
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        maxWidth: "1100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: "center", width: "95%" }}
      >
        {games.map((game, idx) => {
          return (
            <Grid
              item
              xs={6}
              sm={4}
              sx={{
                cursor: "pointer",
                margin: "auto",
              }}
              key={idx + 1}
            >
              <Link to={game.link} className={classes.link}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",

                    aspectRatio: "1/1",
                    alignItems: "center",
                    backgroundColor: "#c9d79e",
                    border: "2px solid transparent",
                    "&:hover": {
                      border: "2px solid #4f6900",
                      transform: "scale(1.05)",
                    },
                    transition: "all .4s ease",
                  }}
                  onClick={() => {}}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: { xs: "600", md: "700" },
                      fontSize: { xs: "24px", sm: "30px" },
                      color: "primary.dark",
                      margin: "0",
                    }}
                  >
                    {game.name}
                  </Typography>
                  {game.icon}
                  <Box
                    sx={{
                      width: "95%",
                      padding: "0.3rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="500"
                      sx={{
                        fontSize: { xs: "11px", sm: "16px" },
                        color: "text.disabled",
                      }}
                    >
                      {game.description}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GamesMenu;
