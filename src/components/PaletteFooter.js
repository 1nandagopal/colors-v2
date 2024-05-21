import React from "react";
import { Footer, Emoji } from "./styles/PaletteFooterStyles";

export default function PaletteFooter({ paletteName, emoji }) {
  return (
    <Footer>
      {paletteName}
      <Emoji>{emoji}</Emoji>
    </Footer>
  );
}
