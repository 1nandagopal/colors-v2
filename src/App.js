import React from "react";
import { useSelector } from "react-redux";

function App() {
  const palettes = useSelector((state) => state.palettes);
  console.log(palettes);
  return <div></div>;
}

export default App;
