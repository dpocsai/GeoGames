import React, { useState, useMemo } from "react";
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
import MobileLookup from "./MobileLookup";
import "./style.css";

const Atlas = () => {
  const [region, setRegion] = useState("World");

  const countries = useMemo(() => {
    return filterByRegion(region);
  }, [region]);

  const regions = [
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
      flex: 0.05,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <img height="20px" alt={params.value} src={params.value} />
      ),
    },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "capital", headerName: "Capital", flex: 1 },
    { field: "region", headerName: "Region", flex: 0.7 },
    {
      field: "population",
      headerName: `Population`,
      flex: 1,
      sortComparator: sortFormattedNumber,
    },
    {
      field: "area",
      headerName: `Area (km${"\u00B2"})`,
      flex: 1,
      sortComparator: sortFormattedNumber,
    },
    {
      field: "density",
      headerName: `Density`,
      flex: 0.8,
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

  return window.innerWidth < 725 ? (
    <MobileLookup />
  ) : (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
      }}
    >
      <FormControl sx={{ width: "30%", margin: "1rem 0" }}>
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
          {regions.map((region, idx) => {
            return (
              <MenuItem value={region} key={idx + 1}>
                {region}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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

export default Atlas;
