import { styled } from "@mui/material";
import sizes from "./sizes";
import bg from "./bg.svg";

export const Root = styled("div")({
  height: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",

  /* background by SVGBackgrounds.com */
  backgroundImage: `url(${bg})`,
  overflowY: "scroll",
});

export const H1 = styled("h1")({
  fontSize: "2rem",
});

export const Container = styled("div")({
  width: "75%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  [sizes.down("xl")]: {
    width: "80%",
  },
  [sizes.down("xs")]: {
    width: "75%",
  },
});

export const Nav = styled("nav")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  "& a": {
    color: "white",
    textDecoration: "none",
    textAlign: "right",
  },
});

export const Palettes = styled("div")({
  boxSizing: "border-box",
  width: "100%",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "2.5rem",
  [sizes.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1.5rem",
  },
  [sizes.down("xs")]: {
    gridTemplateColumns: "1fr",
    gridGap: "1rem",
  },
});
