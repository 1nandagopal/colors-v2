import React from "react";
import PaletteList from "./components/PaletteList";
import { Route, Routes } from "react-router-dom";
import Palette from "./components/Palette";
import SingleColourPalette from "./components/SingleColourPalette";
import NewPalette from "./components/NewPalette";
import Test from "./components/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList />} />
      <Route path="/:paletteId" element={<Palette />} />
      <Route path="/:paletteId/:colorId" element={<SingleColourPalette />} />
      <Route path="/new" element={<NewPalette />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
