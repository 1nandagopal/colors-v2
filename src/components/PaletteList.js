import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MiniPalette from "./MiniPalette";
import { deletePalette } from "../store";
import { Root, Nav, Container, H1, Palettes } from "./styles/PaletteListStyles";

export default function PaletteList() {
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
          <Link to="/new">Create Palette</Link>
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
            Are you sure you want to delete{" "}
            {palettes.find((palette) => palette.id === deleteId)?.paletteName}{" "}
            palette?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
}
