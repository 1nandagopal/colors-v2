import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import PaletteFooter from "./PaletteFooter";
import { generatePalette } from "../colorHelpers";
import ColorBox from "./ColorBox";

const Root = styled.div({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Colors = styled.div({
  height: "90%",
});

/*

export default {
  goBack: {
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
      textDecoration: "none"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};

*/
function Palette() {
  const { paletteId } = useParams();

  const [colorLevel, setColorLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState("hex");

  const updateColorLevel = (newValue) => {
    setColorLevel(newValue);
  };

  const updateColorFormat = (newValue) => {
    setColorFormat(newValue);
  };

  const palette = useSelector((state) =>
    state.palettes.find((palette) => palette.id === paletteId)
  );

  console.log(generatePalette(palette));

  const colorBoxes = generatePalette(palette).colors[colorLevel].map(
    (color) => (
      <ColorBox
        background={color[colorFormat]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${paletteId}/${color.id}`}
      />
    )
  );

  return (
    <Root>
      <Navbar
        colorLevel={colorLevel}
        colorFormat={colorFormat}
        updateColorLevel={updateColorLevel}
        updateColorFormat={updateColorFormat}
        showingAllColors
      />
      <Colors>{colorBoxes}</Colors>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </Root>
  );
}

export default Palette;
