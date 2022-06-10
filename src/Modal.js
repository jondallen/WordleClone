import React from "react";
import { useGlobalContext } from "./globalContext";

const Modal = () => {
  const { won, word } = useGlobalContext();
  if (won) {
    return <h2 className="end-text">Congratulations! You RULE!</h2>;
  }
  return <h2 className="end-text">Nice try! The correct word was {word}</h2>;
};

export default Modal;
