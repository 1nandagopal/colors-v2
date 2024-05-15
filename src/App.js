import React from "react";
import PaletteList from "./components/PaletteList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList />} />
    </Routes>
  );
}

export default App;
