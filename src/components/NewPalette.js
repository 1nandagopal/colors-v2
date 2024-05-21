import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { addColor, clearPalette } from "../store";
import ColorPickerForm from "./ColorPickerForm";
import DnDColorsList from "./DnDColorsList";
import NewPaletteNav from "./NewPaletteNav";

import {
  Container,
  Buttons,
  Main,
  Drawer,
  DrawerHeader,
} from "./styles/NewPaletteStyles";

export default function NewPalette({ maxColors = 20 }) {
  const [open, setOpen] = useState(false);

  const colors = useSelector((state) => state.customPalette);
  const allPalettes = useSelector((state) => state.palettes);

  const isPaletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleClearPalette = () => {
    dispatch(clearPalette());
  };

  const addRandomColour = () => {
    const allColors = allPalettes.flatMap((palette) => palette.colors);
    let randColour, isDuplicateColour;
    do {
      randColour = allColors[Math.floor(Math.random() * allColors.length)];
      isDuplicateColour = colors.some(
        (color) => color.color === randColour.color
      );
    } while (isDuplicateColour);
    dispatch(addColor(randColour));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NewPaletteNav open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Container>
          <Typography variant="h5" gutterBottom>
            Choose Custom Color
          </Typography>
          <Buttons>
            <Button
              sx={{
                width: "45%",
              }}
              variant="outlined"
              color="error"
              onClick={handleClearPalette}
            >
              Clear Palette
            </Button>
            <Button
              sx={{
                width: "50%",
              }}
              variant="contained"
              color="primary"
              onClick={addRandomColour}
              disabled={isPaletteFull}
            >
              Random Colour
            </Button>
          </Buttons>
          <ColorPickerForm isPaletteFull={isPaletteFull} />
        </Container>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DnDColorsList />
      </Main>
    </Box>
  );
}
