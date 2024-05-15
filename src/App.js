import React from "react";
import PaletteList from "./components/PaletteList";
import { Route, Routes } from "react-router-dom";
import Palette from "./components/Palette";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList />} />
      <Route path="/:paletteId" element={<Palette />} />
    </Routes>
  );
}

export default App;
