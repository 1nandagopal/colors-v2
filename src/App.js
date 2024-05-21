import React from "react";
import { Route, Routes } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColourPalette from "./components/SingleColourPalette";
import NewPalette from "./components/NewPalette";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList />} />
      <Route path="/new" element={<NewPalette />} />
      <Route path="/:paletteId" element={<Palette />} />
      <Route path="/:paletteId/:colorId" element={<SingleColourPalette />} />
    </Routes>
  );
}

export default App;
