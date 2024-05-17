import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Drawer,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { addColor, clearPalette } from "../store";
import ColorPickerForm from "./ColorPickerForm";
import DnDColors from "./DnDColorsList";

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: "64px",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
          <Link to="/">
            <Button color="inherit" variant="outlined" size="medium">
              Go Back
            </Button>
          </Link>
          <Button color="success" variant="contained" size="medium">
            Save
          </Button>
        </Toolbar>
      </AppBar>
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
        <DnDColors />
      </Main>
    </Box>
  );
}
