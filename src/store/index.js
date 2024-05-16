import { configureStore } from "@reduxjs/toolkit";
import palettesSlice from "./palettesSlice";
import customPaletteSlice from "./customPaletteSlice";

const syncLocalStorage = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem("colors-v2", JSON.stringify(store.getState().palettes));

  return result;
};

const store = configureStore({
  reducer: {
    palettes: palettesSlice.reducer,
    customPalette: customPaletteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncLocalStorage),
});

export { store };
export const { addPalette, deletePalette } = palettesSlice.actions;
export const { addColor, removeColor } = customPaletteSlice.actions;
