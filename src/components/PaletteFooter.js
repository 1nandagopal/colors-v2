import React from "react";
import styled from "styled-components";

const Footer = styled.footer({
  backgroundColor: "white",
  height: "5vh",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontWeight: "bold",
});

const Emoji = styled.span({
  fontSize: "1.5rem",
  margin: "0 1rem",
});

function PaletteFooter({ paletteName, emoji }) {
  return (
    <Footer>
      {paletteName}
      <Emoji>{emoji}</Emoji>
    </Footer>
  );
}

export default PaletteFooter;
