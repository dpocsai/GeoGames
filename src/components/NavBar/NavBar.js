import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, PublicTwoTone } from "@mui/icons-material";
import useStyles from "./styles";
import GoogleAuth from "../GoogleAuth";

const NavBar = ({ toggleDark, setToggleDark }) => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      sx={{
        marginBottom: "1rem",
        backgroundColor: "primary.dark",
        position: "sticky",
        top: "0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/" className={classes.link}>
            <PublicTwoTone
              sx={{
                display: { xs: "none", md: "flex", fontSize: "40px" },
                mr: 1,
              }}
            />
          </Link>
          <Typography
            noWrap
            sx={{
              mr: 2,
              fontSize: "20px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "5px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" className={classes.link}>
              GeoGames
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <Tooltip title="Menu">
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link to="/" className={classes.link}>
                <MenuItem key={"games"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Games
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/highscores" className={classes.link}>
                <MenuItem key={"highscores"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Highscores
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/lookup" className={classes.link}>
                <MenuItem key={"lookup"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Lookup
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/help" className={classes.link}>
                <MenuItem key={"help"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Help
                  </Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link to="/" className={classes.link}>
            <PublicTwoTone
              sx={{
                display: { xs: "flex", md: "none", fontSize: "30px" },
                mr: 1,
              }}
            />
          </Link>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" className={classes.link}>
              GeoGames
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" className={classes.link}>
              <Button
                key={"games"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Games
              </Button>
            </Link>
            <Link to="/highscores" className={classes.link}>
              <Button
                key={"highscores"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Highscores
              </Button>
            </Link>
            <Link to="/lookup" className={classes.link}>
              <Button
                key={"lookup"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Lookup
              </Button>
            </Link>
            <Link to="/help" className={classes.link}>
              <Button
                key={"help"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Help
              </Button>
            </Link>
          </Box>
          <GoogleAuth />
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
