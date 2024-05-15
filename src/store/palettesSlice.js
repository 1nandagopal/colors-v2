import { createSlice } from "@reduxjs/toolkit";
import seedColors from "../seedColors";

const palettesSlice = createSlice({
  name: "palettes",
  initialState: {
    palettes: JSON.parse(localStorage.getItem("palettes")) || seedColors,
  },
  reducers: {
    addPalette(state, action) {
      state.palettes.push(action.payload);
    },
    deletePalette(state, action) {
      state.palettes = state.palettes.filter(
        (palette) => palette.id !== action.payload
      );
    },
  },
});

export default palettesSlice;
