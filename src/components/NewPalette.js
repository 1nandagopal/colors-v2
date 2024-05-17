import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import { addColor, clearPalette } from "../store";
import ColorPickerForm from "./ColorPickerForm";
import DnDColorsList from "./DnDColorsList";
import NewPaletteNav from "./NewPaletteNav";

const Container = styled("div")({
  width: "90%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Buttons = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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
      {/* <PaletteFormNav
          handleSubmit={this.handleSubmit}
        /> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
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
