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

  const colorBoxes = generatePalette(palette).colors[colorLevel].map(
    (color) => (
      <ColorBox
        background={color[colorFormat]}
        name={color.name}
        showingFullPalette={true}
        moreUrl={`/${paletteId}/${color.id}`}
        key={color.id}
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
