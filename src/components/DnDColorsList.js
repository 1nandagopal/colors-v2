import React from "react";
import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import styled from "styled-components";
import DnDColorBox from "./DnDColorBox";

const Grid = styled.div({
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
});

export default function DnDColorsList() {
  const colors = useSelector((state) => state.customPalette);
  const sensors = useSensors(useSensor(MouseSensor));

  const handleDragEnd = () => {
    console.log("drag end");
  };
  return (
    <>
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
    </>
  );
}
