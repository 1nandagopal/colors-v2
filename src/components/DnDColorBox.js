import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { styled } from "styled-components";
import { CSS } from "@dnd-kit/utilities";
import { Delete } from "@mui/icons-material";

const Root = styled.div((props) => ({
  // width: "20%",
  // height: "25%",
  // margin: "0 auto",
  // display: "inline-block",
  position: "relative",
  cursor: "move",
  // marginBottom: "-3.5px",
  backgroundColor: props.$color,
  // "&:hover svg": {
  //   color: "white",
  //   transform: "scale(1.5)",
  // },
  // cursor:
}));

const BoxContent = styled.div((props) => ({
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
      </BoxContent>
    </Root>
  );
}
