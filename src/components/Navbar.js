import { MenuItem, Select, Slider, Snackbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useToggleState from "../hooks/useToggleState";

const Header = styled.header({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "6vh",
});

const Logo = styled.div({
  marginRight: "15px",
  padding: "0 13px",
  fontSize: "22px",
  backgroundColor: "#eceff1",
  fontFamily: "Roboto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "black",
  },
});

const SliderContainer = styled.div({
  width: "340px",
  margin: "0 10px",
  display: "inline-block",
});

const SelectContainer = styled.div({
  marginLeft: "auto",
  marginRight: "1rem",
});

function Navbar({
  colorLevel,
  updateColorLevel,
  colorFormat,
  updateColorFormat,
}) {
  const [isSnackbarOpen, toggleSnackbar] = useToggleState(false);

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
        <Link to="/">reactcolorpicker</Link>
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
        <Select value={colorFormat} onChange={handleSelectChange}>
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

export default Navbar;
