import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";

import theme from "./theme";
import NavBar from "./components/NavBar/NavBar";
import GamesMenu from "./components/Games/GamesMenu";
import GameSetup from "./components/Games/GameSetup";
import FlagsAndCapitals from "./components/Games/Flags&Capitals/FlagsAndCapitals";
import HighLow from "./components/Games/HighLow/HighLow";
import Lookup from "./components/Lookup/Lookup";
import MobileLookup from "./components/Lookup/MobileLookup";
import Lists from "./components/Games/Lists/Lists";
import Maps from "./components/Games/Maps/Maps";

const App = () => {
  const { game } = useSelector((state) => state.game);

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Router>
          <CssBaseline />
          <NavBar />
          <Routes>
            <Route exact path="/" element={<GamesMenu />} />
            <Route
              exact
              path="/flags"
              element={
                game ? (
                  <FlagsAndCapitals game={game} />
                ) : (
                  <GameSetup
                    title="Flags"
                    options={["Multiple Choice", "Type Answer"]}
                  />
                )
              }
            />
            <Route
              exact
              path="/capitals"
              element={
                game ? (
                  <FlagsAndCapitals game={game} />
                ) : (
                  <GameSetup
                    title="Capitals"
                    options={["Multiple Choice", "Type Answer"]}
                  />
                )
              }
            />
            <Route
              exact
              path="/highlow"
              element={
                game ? (
                  <HighLow game={game} />
                ) : (
                  <GameSetup
                    title="HighLow"
                    options={["Population", "Area", "Density"]}
                  />
                )
              }
            />
            <Route
              exact
              path="/lookup"
              element={window.innerWidth < 725 ? <MobileLookup /> : <Lookup />}
            />
            <Route
              exact
              path="/lists"
              element={
                game ? <Lists game={game} /> : <GameSetup title="Lists" />
              }
            />
            <Route
              exact
              path="/maps"
              element={game ? <Maps game={game} /> : <GameSetup title="Maps" />}
            />
          </Routes>
        </Router>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default App;

//CHANGE URL IN USECONFIRM WITHIN LISTS COMPONENT BEFORE PRODUCITON
