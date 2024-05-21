import { styled } from "@mui/material";

export const Root = styled("div")({
  height: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
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
});

export const Nav = styled("nav")({
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

export const Palettes = styled("div")({
  boxSizing: "border-box",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(4, 22.5%)",
  gridGap: "2.5rem",
});
