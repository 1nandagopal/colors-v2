import { configureStore } from "@reduxjs/toolkit";
import palettesSlice from "./palettesSlice";

const syncLocalStorage = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem("colors-v2", JSON.stringify(store.getState().palettes));

  return result;
};

const store = configureStore({
  reducer: {
    palettes: palettesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncLocalStorage),
});

export { store };
export const { addPalette, deletePalette } = palettesSlice.actions;
