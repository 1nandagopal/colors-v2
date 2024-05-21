import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { DRAWER_WIDTH } from "../../colorHelpers";

export const AppBar = styled(MuiAppBar, {
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
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const NavButtons = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "1rem",
  gap: "1rem",
  "& a": {
    textDecoration: "none",
  },
});
