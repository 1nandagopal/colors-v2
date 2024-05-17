import React, { useState } from "react";
import {
  Toolbar,
  Button,
  CssBaseline,
  IconButton,
  Typography,
  styled,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { DEFAULT_WIDTH } from "../colorHelpers";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: "64px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DEFAULT_WIDTH}px)`,
    marginLeft: `${DEFAULT_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavButtons = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "1rem",
  gap: "1rem",
  "& a": {
    textDecoration: "none",
  },
});

export default function NewPaletteNav({ open, handleDrawerOpen }) {
  const [newPaletteFormOpen, toggleNewPaletteForm] = useState(false);

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
          <Button color="success" variant="contained" size="medium">
            Save palette
          </Button>
        </NavButtons>
      </AppBar>
    </Box>
  );
}
