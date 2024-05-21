import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

import {
  Root,
  BoxContent,
  CopyOverlay,
  CopyMessage,
  CopyButton,
  CopyText,
  ColorName,
  SeeMore,
} from "./styles/ColorBoxStyles";

export default function ColorBox({ color, name, moreUrl, showingFullPalette }) {
  const [copyOverlayOpen, toggleCopyOverlay] = useState(false);

  const triggerCopyOverlay = () => {
    toggleCopyOverlay(true);
  };

  useEffect(() => {
    let timerId;
    if (copyOverlayOpen)
      timerId = setTimeout(() => {
        toggleCopyOverlay(false);
      }, 900);
    return () => {
      clearTimeout(timerId);
    };
  }, [copyOverlayOpen]);

  return (
    <CopyToClipboard text={color} onCopy={triggerCopyOverlay}>
      <Root color={color} showingFullPalette={showingFullPalette}>
        <CopyOverlay color={color} copyOverlay={copyOverlayOpen} />
        <CopyMessage copyOverlay={copyOverlayOpen}>
          <h1>COPIED!</h1>
          <CopyText color={color}>{color}</CopyText>
        </CopyMessage>
        <BoxContent>
          <ColorName color={color}>{name}</ColorName>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <SeeMore color={color}>MORE</SeeMore>
            </Link>
          )}
        </BoxContent>
        <CopyButton color={color}>Copy</CopyButton>
      </Root>
    </CopyToClipboard>
  );
}
