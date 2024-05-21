import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import { Root, Colors } from "./styles/PaletteStyles";
import { generatePalette } from "../colorHelpers";

export default function Palette() {
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
        name={color.name}
        color={color[colorFormat]}
        moreUrl={`/${paletteId}/${color.id}`}
        showingFullPalette={true}
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
