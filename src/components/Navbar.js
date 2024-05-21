import React, { useState } from "react";
import { MenuItem, Select, Slider, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

import {
  Header,
  Logo,
  SliderContainer,
  SelectContainer,
} from "./styles/NavbarStyles";

export default function Navbar({
  colorLevel,
  updateColorLevel,
  colorFormat,
  updateColorFormat,
}) {
  const [isSnackbarOpen, toggleSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    toggleSnackbar(false);
  };

  const handleSliderChange = (event, newValue) => {
    updateColorLevel(newValue);
  };

  const handleSelectChange = (event) => {
    updateColorFormat(event.target.value);
    toggleSnackbar(true);
  };

  return (
    <Header>
      <Logo>
        <Link to="/">reactcolors-v2</Link>
      </Logo>
      {colorLevel && (
        <>
          <span>Level: {colorLevel}</span>
          <SliderContainer>
            <Slider
              value={colorLevel}
              onChange={handleSliderChange}
              step={100}
              min={100}
              max={900}
              track={false}
              marks
            />
          </SliderContainer>
        </>
      )}
      <SelectContainer>
        <Select value={colorFormat} onChange={handleSelectChange} size="small">
          <MenuItem value="hex">HEX</MenuItem>
          <MenuItem value="rgb">RGB</MenuItem>
          <MenuItem value="rgba">RGBA</MenuItem>
        </Select>
      </SelectContainer>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Color format changed to ${colorFormat}`}
      />
    </Header>
  );
}
