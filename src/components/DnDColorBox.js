import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeColor } from "../store";
import chroma from "chroma-js";

const Root = styled("div")((props) => ({
  position: "relative",
  cursor: props.isDragging ? "grabbing" : "move",
  backgroundColor: props.$color,
  opacity: props.isDragging ? "0.75" : "1",
  boxShadow: props.isDragging
    ? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
    : "none",
  zIndex: props.isDragging ? "10" : "0",
  "&:hover svg": {
    color: "white",
    transform: "scale(1.5)",
  },
}));

const BoxContent = styled("div")((props) => ({
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
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
});

export default function DnDColorBox({ name, color }) {
  const dispatch = useDispatch();

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

  const handleDelete = () => {
    dispatch(removeColor(name));
  };

  return (
    <Root
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      $color={color}
      isDragging={isDragging}
      style={style}
    >
      <BoxContent $color={color}>
        <span>{name}</span>
        <DeleteIcon onClick={handleDelete} />
      </BoxContent>
    </Root>
  );
}
