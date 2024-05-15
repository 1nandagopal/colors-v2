import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";
import useToggleState from "../hooks/useToggleState";
import { useDispatch, useSelector } from "react-redux";
import MiniPalette from "./MiniPalette";
import { deletePalette } from "../store";

const Root = styled.div({
  height: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

const H1 = styled.h1({
  fontSize: "2rem",
});

const Container = styled.div({
  width: "75%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
});

const Nav = styled.nav({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  // color: "white",
  "& a": {
    // color: "white",
    textDecoration: "none",
  },
});

const Palettes = styled.div({
  boxSizing: "border-box",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(4, 22.5%)",
  gridGap: "2.5rem",
});

function PaletteList() {
  const [isDeleteDialogOpen, toggleDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useDispatch();

  const palettes = useSelector((state) => state.palettes);

  const handleClose = () => {
    toggleDeleteDialog(false);
  };

  const openDeleteDialog = (id) => {
    toggleDeleteDialog(true);
    setDeleteId(id);
  };

  const handleDelete = () => {
    dispatch(deletePalette(deleteId));
    setDeleteId("");
    toggleDeleteDialog(false);
  };
  return (
    <Root>
      <Container>
        <Nav>
          <H1>React Colors V2</H1>
          <a href="#">Create Palette</a>
        </Nav>
        <Palettes>
          {palettes.map((palette) => (
            <MiniPalette
              id={palette.id}
              key={palette.id}
              openDeleteDialog={openDeleteDialog}
            />
          ))}
        </Palettes>
      </Container>
      <Dialog open={isDeleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Delete Palette</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete palette?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
}

export default PaletteList;
