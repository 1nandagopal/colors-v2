import React from "react";
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
  width: "50%",
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
  const [openDeleteDialog, toggleDeleteDialog] = useToggleState(false);
  const handleClose = () => {
    toggleDeleteDialog();
  };
  const handleDelete = () => {
    toggleDeleteDialog();
    // delete palette
  };

  return (
    <Root>
      <Container>
        <Nav>
          <H1>React Colors V2</H1>
          <a href="#">Create Palette</a>
        </Nav>
        <Palettes>{/* Map palettes here */}</Palettes>
      </Container>
      <Dialog open={openDeleteDialog} onClose={handleClose}>
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
