import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Button,
  CssBaseline,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NewPaletteFormDialog from "./NewPaletteFormDialog";
import { AppBar, NavButtons } from "./styles/NewPaletteNavStyles";

export default function NewPaletteNav({ open, handleDrawerOpen }) {
  const [newPaletteFormOpen, toggleNewPaletteForm] = useState(false);

  const openNewPaletteForm = () => {
    toggleNewPaletteForm(true);
  };
  const closeNewPaletteForm = () => {
    toggleNewPaletteForm(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create Custom Palette
          </Typography>
        </Toolbar>
        <NavButtons>
          <Link to="/">
            <Button color="inherit" variant="outlined" size="medium">
              Go Back
            </Button>
          </Link>
          <Button
            color="success"
            variant="contained"
            size="medium"
            onClick={openNewPaletteForm}
          >
            Save palette
          </Button>
        </NavButtons>
      </AppBar>
      {newPaletteFormOpen && (
        <NewPaletteFormDialog
          newPaletteFormOpen={newPaletteFormOpen}
          closeNewPaletteForm={closeNewPaletteForm}
        />
      )}
    </Box>
  );
}
