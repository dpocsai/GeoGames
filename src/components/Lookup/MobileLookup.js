import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { filterByRegion, formatNumber } from "../../helpers";
import Lookup from "./Lookup";
import "./style.css";

const MobileLookup = () => {
  const [data, setData] = useState("Capital");
  const [region, setRegion] = useState("World");

  const countries = filterByRegion(region);

  const dataOptions = ["Capital", "Region", "Population", "Area", "Density"];
  const regionOptions = [
    "World",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
    "North America",
    "South America",
  ];

  const sortFormattedNumber = (a, b) =>
    +a.replace(/,/g, "") - +b.replace(/,/g, "");

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <img height="20px" alt={params.value} src={params.value} />
      ),
    },
    { field: "country", headerName: "Country", flex: 4 },
    {
      field: "capital",
      headerName: "Capital",
      flex: 4,
      hide: data !== "Capital",
    },
    { field: "region", headerName: "Region", flex: 4, hide: data !== "Region" },
    {
      field: "population",
      headerName: `Population`,
      flex: 4,
      hide: data !== "Population",
      sortComparator: sortFormattedNumber,
    },
    {
      field: "area",
      headerName: `Area (km${"\u00B2"})`,
      flex: 4,
      hide: data !== "Area",
      sortComparator: sortFormattedNumber,
    },
    {
      field: "density",
      headerName: `Density`,
      flex: 4,
      hide: data !== "Density",
      sortComparator: sortFormattedNumber,
    },
  ];
  const rows = countries.map((country, idx) => {
    return {
      id: idx + 1,
      flag: country.flag,
      country: country.name,
      region: country.region,
      capital: country.capital,
      population: formatNumber(country.population),
      area: formatNumber(country.area),
      density: formatNumber(country.density),
    };
  });
  return window.innerWidth >= 725 ? (
    <Lookup />
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}
      >
        <FormControl size="small" sx={{ width: "45%", margin: "1rem 0 0 0" }}>
          <InputLabel id="region-select">
            <Typography variant="overline">Region</Typography>
          </InputLabel>
          <Select
            id="region-select"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
            }}
            label={<Typography variant="overline">Region</Typography>}
            MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
          >
            {regionOptions.map((option, idx) => {
              return (
                <MenuItem value={option} key={idx + 1}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "45%", margin: "1rem 0 0 0" }}>
          <InputLabel id="data-select">
            <Typography variant="overline">Data</Typography>
          </InputLabel>
          <Select
            id="data-select"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
            label={<Typography variant="overline">Data</Typography>}
            MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
          >
            {dataOptions.map((option, idx) => {
              return (
                <MenuItem value={option} key={idx + 1}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ height: "100vh", width: "100%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          disableExtendRowFullWidth
          getRowHeight={() => "auto"}
          rowsPerPageOptions={[10, 20, 50, 100]}
          sx={{ border: "none" }}
        />
      </Box>
    </Container>
  );
};

export default MobileLookup;
