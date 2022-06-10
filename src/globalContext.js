import React, { useEffect, useState, useContext } from "react";
import { data } from "./data";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [disableAll, setDisableAll] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const index = Math.floor(Math.random() * (data.length - 1));
    setWord(data[index]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        word,
        disableAll,
        setDisableAll,
        won,
        setWon,
        showModal,
        setShowModal,
        attempts,
        setAttempts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
