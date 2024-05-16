import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useToggleState from "../hooks/useToggleState";
import styled from "styled-components";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const Root = styled.div((props) => ({
  width: "20%",
  height: props.$showingFullPalette ? "25%" : "50%",
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-4px",
  background: props.$color,
  "&:hover button": {
    opacity: 1,
  },
}));

const BoxContent = styled.div({
  position: "absolute",
  width: "100%",
  left: "0px",
  bottom: "0px",
  padding: "10px",
  color: "black",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  boxSizing: "border-box",
});

const CopyButton = styled.button((props) => ({
  color: chroma(props.$color).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
  width: "100px",
  height: "30px",
  position: "absolute",
  display: "inline-block",
  top: "50%",
  left: "50%",
  marginLeft: "-50px",
  marginTop: "-15px",
  textAlign: "center",
  outline: "none",
  background: "rgba(255, 255, 255, 0.3)",
  fontSize: "1rem",
  lineHeight: "30px",
  textTransform: "uppercase",
  border: "none",
  textDecoration: "none",
  opacity: 0,
  cursor: "pointer",
}));

const ColorName = styled.span((props) => ({
  color: chroma(props.$color).luminance() <= 0.25 ? "white" : "black",
}));

const SeeMore = styled.span((props) => ({
  color: chroma(props.$color).luminance() >= 0.5 ? "rgba(0,0,0,0.6)" : "white",
  background: "rgba(255, 255, 255, 0.3)",
  position: "absolute",
  border: "none",
  right: "0px",
  bottom: "0px",
  width: "60px",
  height: "30px",
  textAlign: "center",
  lineHeight: "30px",
  textTransform: "uppercase",
}));

const CopyText = styled.div((props) => ({
  color: chroma(props.$color).luminance() >= 0.7 ? "black" : "white",
}));

const CopyOverlay = styled.div((props) => ({
  opacity: "0",
  zIndex: "0",
  width: "100%",
  height: "100%",
  transition: "transform 0.8s ease-in",
  transform: "scale(0.1)",
  background: props.$color,

  ...(props.$copyOverlay && {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  }),
}));

const CopyMessage = styled.div((props) => ({
  position: "fixed",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "4rem",
  transform: "scale(0.1)",
  opacity: "0",
  color: "white",
  "& h1": {
    fontWeight: "400",
    textShadow: "1px 2px black",
    background: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    textAlign: "center",
    marginBottom: "0",
    padding: "1rem",
    textTransform: "uppercase",
  },
  "& p": {
    fontSize: "2rem",
    fontWeight: "100",
  },

  ...(props.$copyOverlay && {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in",
    transitionDelay: "0.3s",
  }),
}));

function ColorBox({ color, name, moreUrl, showingFullPalette }) {
  const [copyOverlay, toggleCopyOverlay] = useToggleState(false);

  const triggerCopyOverlay = () => {
    toggleCopyOverlay();
  };

  useEffect(() => {
    let timerId;
    if (copyOverlay)
      timerId = setTimeout(() => {
        toggleCopyOverlay();
      }, 1300);
    return () => {
      clearTimeout(timerId);
    };
  }, [copyOverlay]);

  return (
    <CopyToClipboard text={color} onCopy={triggerCopyOverlay}>
      <Root $color={color} $showingFullPalette={showingFullPalette}>
        <CopyOverlay $color={color} $copyOverlay={copyOverlay} />
        <CopyMessage $copyOverlay={copyOverlay}>
          <h1>COPIED!</h1>
          <CopyText $color={color}>{color}</CopyText>
        </CopyMessage>
        <BoxContent>
          <ColorName $color={color}>{name}</ColorName>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <SeeMore $color={color}>MORE</SeeMore>
            </Link>
          )}
        </BoxContent>
        <CopyButton $color={color}>Copy</CopyButton>
      </Root>
    </CopyToClipboard>
  );
}

export default ColorBox;
