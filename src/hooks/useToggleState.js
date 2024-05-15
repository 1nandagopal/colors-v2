import React, { useState } from "react";

export default function useToggleState(initialVal) {
  const [state, setState] = useState(initialVal);
  const toggleState = () => {
    setState(!state);
  };
  return [state, toggleState];
}
