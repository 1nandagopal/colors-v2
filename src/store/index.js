import { configureStore } from "@reduxjs/toolkit";
import palettesSlice from "./palettesSlice";

const store = configureStore({
  reducer: {
    palettes: palettesSlice.reducer,
  },
});

export { store };
export const { addPalette, deletePalette } = palettesSlice.actions;
