import { DRAWER_WIDTH } from "../../colorHelpers";
import { styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

export const Container = styled("div")({
  width: "90%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Buttons = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  height: "calc(100vh - 64px)",
  padding: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: "64px",
  width: "100%",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Drawer = styled(MuiDrawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  height: "100vh",
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
});
