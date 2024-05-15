import { createSlice } from "@reduxjs/toolkit";
import seedColors from "../seedColors";

const palettesSlice = createSlice({
  name: "palettes",
  initialState: JSON.parse(localStorage.getItem("colors-v2")) || seedColors,
  reducers: {
    addPalette(palettes, action) {
      palettes.push(action.payload);
    },
    deletePalette(palettes, action) {
      return palettes.filter((palette) => palette.id !== action.payload);
    },
  },
});

export default palettesSlice;
