import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material";

const Root = styled("div")((props) => ({
  position: "relative",
  cursor: "move",
  backgroundColor: props.$color,
  "&:hover svg": {
    color: "white",
    transform: "scale(1.5)",
  },
  // cursor:
}));

const BoxContent = styled("div")((props) => ({
  position: "absolute",
  width: "100%",
  left: "0px",
  bottom: "0px",
  padding: "10px",
  // color:
  //   chroma(props.$color).luminance() <= 0.1
  //     ? "rgba(255,255,255,0.8)"
  //     : "rgba(0,0,0,0.6)",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  display: "flex",
  justifyContent: "space-between",
}));

const DeleteIcon = styled(Delete)({
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
});

export default function DnDColorBox({ name, color }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Root
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      $color={color}
      style={style}
    >
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon />
      </BoxContent>
    </Root>
  );
}
