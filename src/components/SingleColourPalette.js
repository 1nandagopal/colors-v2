import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { gatherShades, generatePalette } from "../colorHelpers";
import ColorBox from "./ColorBox";
import styled from "styled-components";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

const Root = styled.div({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const Colors = styled.div({
  height: "90%",
});

const GoBack = styled.div({
  width: "20%",
  height: "50%",
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-3.5px",
  opacity: 1,
  backgroundColor: "black",
  "& a": {
    color: "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
  },
});

function SingleColourPalette() {
  const { paletteId, colorId } = useParams();

  const [colorFormat, setColorFormat] = useState("hex");

  const palette = useSelector((state) =>
    state.palettes.find((palette) => palette.id === paletteId)
  );
  const shades = gatherShades(generatePalette(palette), colorId);
  const colorBoxes = shades.map((color) => (
    <ColorBox
      name={color.name}
      color={color[colorFormat]}
      showingFullPalette={false}
      key={color.name}
    />
  ));

  const updateColorFormat = (newValue) => {
    setColorFormat(newValue);
  };

  return (
    <Root>
      <Navbar colorFormat={colorFormat} updateColorFormat={updateColorFormat} />
      <Colors>
        {colorBoxes}
        <GoBack>
          <Link to={`/${paletteId}`}>GO BACK</Link>
        </GoBack>
      </Colors>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </Root>
  );
}

export default SingleColourPalette;

/*
import { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import ColourBox from "./ColourBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColourPalette extends Component {
  render() {

    return (
      <div className={`${classes.Palette}`}>
        <Navbar level={false} changeColourFormat={this.changeColourFormat} />
        <div className={classes.colours}>
          {colourBoxes}
          <div className={`${classes.goBack}`}>
            <Link to={`/palette/${palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

 */
