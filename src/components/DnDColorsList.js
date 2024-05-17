import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { SortableContext } from "@dnd-kit/sortable";

const Grid = styled.div({
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
});

export default function DnDColors() {
  const colors = useSelector((state) => state.customPalette);
  const sensors = useSensors(useSensor(MouseEvent));

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        <Grid>
          <SortableContext items={colors.map((color) => color.name)}>
            {/* Map color boxes here */}
          </SortableContext>
        </Grid>
      </DndContext>
    </>
  );
}
