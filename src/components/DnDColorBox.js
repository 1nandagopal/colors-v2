import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { removeColor } from "../store";
import { Root, BoxContent, DeleteIcon } from "./styles/DnDColorBoxStyles";

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
      color={color}
      isDragging={isDragging}
      style={style}
    >
      <BoxContent color={color}>
        <span>{name}</span>
        <DeleteIcon onClick={handleDelete} />
      </BoxContent>
    </Root>
  );
}
