import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import DnDColorBox from "./DnDColorBox";
import { updatePalette } from "../store";
import { styled } from "@mui/material";
import sizes from "./styles/sizes";

const Grid = styled("div")({
  height: "100%",
  overflow: "hidden",
  display: "grid",
  gridTemplate: "repeat(4, 1fr) / repeat(5, 1fr)",
  [sizes.down("lg")]: {
    gridTemplate: "repeat(5, 1fr) / repeat(4, 1fr)",
  },
  [sizes.down("md")]: {
    gridTemplate: "repeat(10, 1fr) / repeat(2, 1fr)",
  },
  [sizes.down("sm")]: {
    gridTemplate: "repeat(20, 1fr) / 1fr",
  },
});

export default function DnDColorsList() {
  const colors = useSelector((state) => state.customPalette);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 7 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = colors.findIndex((color) => color.name === active.id);
      const newIndex = colors.findIndex((color) => color.name === over.id);
      dispatch(updatePalette(arrayMove(colors, oldIndex, newIndex)));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Grid>
        <SortableContext items={colors.map((color) => color.name)}>
          {colors.map((color) => (
            <DnDColorBox key={color.name} {...color} />
          ))}
        </SortableContext>
      </Grid>
    </DndContext>
  );
}
