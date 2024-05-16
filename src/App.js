import React from "react";
import PaletteList from "./components/PaletteList";
import { Route, Routes } from "react-router-dom";
import Palette from "./components/Palette";
import SingleColourPalette from "./components/SingleColourPalette";
import NewPalette from "./components/NewPalette";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList />} />
      <Route path="/:paletteId" element={<Palette />} />
      <Route path="/:paletteId/:colorId" element={<SingleColourPalette />} />
      <Route path="/new" element={<NewPalette />} />
    </Routes>
  );
}

export default App;
