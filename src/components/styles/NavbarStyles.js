import { styled } from "@mui/material";
import sizes from "./sizes";

export const Header = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "6vh",
});

export const Logo = styled("div")({
  marginRight: "15px",
  padding: "0 13px",
  fontSize: "22px",
  backgroundColor: "#eceff1",
  fontFamily: "Roboto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "black",
  },
  [sizes.down("xs")]: {
    display: "none",
  },
});

export const SliderContainer = styled("div")({
  width: "350px",
  margin: "0 10px",
  paddingTop: "3px",
  display: "inline-block",
  [sizes.down("sm")]: {
    width: "150px",
  },
});

export const SelectContainer = styled("div")({
  marginLeft: "auto",
  marginRight: "1rem",
});
