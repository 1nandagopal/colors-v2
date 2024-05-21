import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Root,
  MiniColorBox,
  DeleteIcon,
  Colors,
  Title,
  Emoji,
} from "./styles/MiniPaletteStyles";

export default function MiniPalette(props) {
  const palette = useSelector((state) =>
    state.palettes.find((palette) => palette.id === props.id)
  );

  const miniColorBoxes = palette.colors.map((color) => (
    <MiniColorBox key={color.name} color={color.color} />
  ));

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${props.id}`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    props.openDeleteDialog(props.id);
  };

  return (
    <Root onClick={handleClick}>
      <DeleteIcon
        style={{
          transition: "opacity 0.25s ease-in-out",
        }}
        onClick={handleDelete}
      />
      <Colors>{miniColorBoxes}</Colors>
      <Title>
        {palette.paletteName}
        <Emoji>{palette.emoji}</Emoji>
      </Title>
    </Root>
  );
}
