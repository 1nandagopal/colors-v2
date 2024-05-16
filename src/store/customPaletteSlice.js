import { createSlice } from "@reduxjs/toolkit";
import seedColors from "../seedColors";

const customPaletteSlice = createSlice({
  name: "customPalette",
  initialState: seedColors[0].colors,
  reducers: {
    addColor(customPalette, action) {
      customPalette.push(action.payload);
    },
    removeColor(customPalette, action) {
      return customPalette.filter((color) => color.name !== action.payload);
    },
  },
});

export default customPaletteSlice;
