import React from "react";
import { useSelector } from "react-redux";
import PaletteList from "./components/PaletteList";

function App() {
  const palettes = useSelector((state) => state.palettes);
  console.log(palettes);
  return <PaletteList />;
}

export default App;
