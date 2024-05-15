import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useToggleState from "../hooks/useToggleState";
import styled from "styled-components";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const Root = styled.div((props) => ({
  width: "20%",
  height: "25%",
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-3.5px",
  background: props.$background,
  "&:hover button": {
    opacity: 1,
  },
}));

const CopyOverlay = styled.div((props) => ({
  opacity: "0",
  zIndex: "0",
  width: "100%",
  height: "100%",
  transition: "transform 0.6s ease-in-out",
  transform: "scale(0.1)",
  background: props.$background,

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
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  }),
}));

const CopyText = styled.div((props) => ({
  color: chroma(props.$background).luminance() >= 0.7 ? "black" : "white",
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

const ColorName = styled.span((props) => ({
  color: chroma(props.$background).luminance() <= 0.25 ? "white" : "black",
}));

const CopyButton = styled.button((props) => ({
  color:
    chroma(props.$background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
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
}));

const SeeMore = styled.span((props) => ({
  color:
    chroma(props.$background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
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

function ColorBox({ background, name, moreUrl }) {
  const [copyOverlay, setCopyOverlay] = useToggleState(false);

  const triggerCopyOverlay = () => {
    setCopyOverlay(true);
  };

  useEffect(() => {
    console.log("use effect");
    let timerId;
    if (copyOverlay)
      timerId = setTimeout(() => {
        setCopyOverlay(false);
      }, 1500);
    return () => {
      clearTimeout(timerId);
    };
  }, [copyOverlay]);

  return (
    <CopyToClipboard text={background} onCopy={triggerCopyOverlay}>
      <Root $background={background}>
        <CopyOverlay $background={background} $copyOverlay={copyOverlay} />
        <CopyMessage $copyOverlay={copyOverlay}>
          <h1>COPIED!</h1>
          <CopyText $background={background}>{background}</CopyText>
        </CopyMessage>
        <div>
          <BoxContent>
            <ColorName $background={background}>{name}</ColorName>
          </BoxContent>
          <CopyButton $background={background}>Copy</CopyButton>
        </div>
        <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
          <SeeMore $background={background}>MORE</SeeMore>
        </Link>
      </Root>
    </CopyToClipboard>
  );
}

export default ColorBox;
