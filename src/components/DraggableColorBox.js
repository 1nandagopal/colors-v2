import React from "react";
import chroma from "chroma-js";
import styled from "styled-components";
import { Delete } from "@mui/icons-material";

const Root = styled.div((props) => ({
  width: "20%",
  height: "25%",
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-3.5px",
  backgroundColor: props.$color,
  "&:hover svg": {
    color: "white",
    transform: "scale(1.5)",
  },
}));

const BoxContent = styled.div((props) => ({
  position: "absolute",
  width: "100%",
  left: "0px",
  bottom: "0px",
  padding: "10px",
  color:
    chroma(props.$color).luminance() <= 0.1
      ? "rgba(255,255,255,0.8)"
      : "rgba(0,0,0,0.6)",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  display: "flex",
  justifyContent: "space-between",
}));

const DeleteIcon = styled(Delete)({
  transition: "all 0.3s ease-in-out",
});

function DraggableColorBox({ name, color }) {
  return (
    <Root $color={color}>
      <BoxContent $color={color}>
        <span>{name}</span>
        <DeleteIcon />
      </BoxContent>
    </Root>
  );
}

export default DraggableColorBox;
