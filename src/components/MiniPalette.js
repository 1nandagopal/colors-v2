import React from "react";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div({
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  "&:hover svg": {
    opacity: 1,
  },
});

const Colors = styled.div({
  backgroundColor: "#dae1e4",
  height: "150px",
  width: "100%",
  borderRadius: "5px",
  overflow: "hidden",
});

const DeleteIcon = styled(Delete)({
  color: "white",
  backgroundColor: "#eb3d30",
  width: "20px",
  height: "20px",
  position: "absolute",
  right: "0px",
  top: "0px",
  padding: "10px",
  zIndex: 10,
  opacity: 0,
});

const Title = styled.h5({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0",
  color: "black",
  paddingTop: "0.5rem",
  fontSize: "1rem",
  position: "relative",
});

const Emoji = styled.span({
  marginLeft: "0.5rem",
  fontSize: "1.5rem",
});

const MiniColorBox = styled.div((props) => ({
  height: "25%",
  width: "20%",
  display: "inline-block",
  margin: "0 auto",
  position: "relative",
  marginBottom: "-3.5px",
  backgroundColor: props.$color,
}));

function MiniPalette(props) {
  const palette = useSelector((state) =>
    state.palettes.find((palette) => palette.id === props.id)
  );

  const miniColorBoxes = palette.colors.map((color) => (
    <MiniColorBox $color={color.color} />
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
          transition: "opacity 0.3s ease-in-out",
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

export default MiniPalette;
