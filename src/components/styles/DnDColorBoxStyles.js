import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material";
import chroma from "chroma-js";

export const Root = styled("div")(({ isDragging, color }) => ({
  position: "relative",
  cursor: isDragging ? "grabbing" : "move",
  backgroundColor: color,
  opacity: isDragging ? "0.75" : "1",
  boxShadow: isDragging
    ? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
    : "none",
  zIndex: isDragging ? "10" : "0",
  "&:hover svg": {
    color: "white",
    transform: "scale(1.5)",
  },
}));

export const BoxContent = styled("div")(({ color }) => ({
  position: "absolute",
  width: "100%",
  left: "0px",
  bottom: "0px",
  padding: "10px",
  color:
    chroma(color).luminance() <= 0.25
      ? "rgba(255,255,255,0.8)"
      : "rgba(0,0,0,0.6)",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  display: "flex",
  justifyContent: "space-between",
}));

export const DeleteIcon = styled(Delete)({
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
});
