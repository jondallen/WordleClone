import React, { useRef, useEffect, useState, useContext } from "react";
import { useGlobalContext } from "./globalContext";

const Block = () => {
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [guess3, setGuess3] = useState("");
  const [guess4, setGuess4] = useState("");
  const [guess5, setGuess5] = useState("");

  const [inputStyle1, setInputStyle1] = useState("");
  const [inputStyle2, setInputStyle2] = useState("");
  const [inputStyle3, setInputStyle3] = useState("");
  const [inputStyle4, setInputStyle4] = useState("");
  const [inputStyle5, setInputStyle5] = useState("");

  const [guessIndex, setGuessIndex] = useState(1);

  const {
    word,
    disableAll,
    setDisableAll,
    setWon,
    setShowModal,
    attempts,
    setAttempts,
  } = useGlobalContext();

  const [disabled, setDisabled] = useState(false);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalGuess = [guess1, guess2, guess3, guess4, guess5];
    finalGuess.forEach((item, index) => {
      let styling = "";
      if (word.charAt(index) === item) {
        styling = "green_block";
      } else if (word.includes(item)) {
        styling = "yellow_block";
      } else {
        styling = "white_block";
      }

      switch (index) {
        case 0:
          setInputStyle1(styling);
          break;
        case 1:
          setInputStyle2(styling);
          break;
        case 2:
          setInputStyle3(styling);
          break;
        case 3:
          setInputStyle4(styling);
          break;
        case 4:
          setInputStyle5(styling);
          break;
        default:
          break;
      }
    });
    if (finalGuess.join("") === word) {
      setDisableAll(true);
      setWon(true);
      setShowModal(true);
    } else {
      setAttempts((attempts) => {
        setAttempts(attempts + 1);
      });
      if (attempts === 5) {
        setDisableAll(true);
        setWon(false);
        setShowModal(true);
      } else {
        setDisabled(true);
      }
    }
  };

  useEffect(() => {
    input1.current.focus();
  }, []);

  const jumpToNext = (e) => {
    e.preventDefault();
    if (e.key === "Backspace" || e.key === "Delete") {
      if (guessIndex > 1) {
        setGuessIndex((guessIndex) => {
          return guessIndex - 1;
        });
      }
    } else {
      if (guessIndex >= 1 && guessIndex < 5) {
        setGuessIndex((guessIndex) => {
          return guessIndex + 1;
        });
      }
    }
  };

  useEffect(() => {
    setFocus(guessIndex);
  }, [guessIndex]);

  const setFocus = (index) => {
    switch (index) {
      case 1:
        input1.current.focus();
        break;
      case 2:
        input2.current.focus();
        break;
      case 3:
        input3.current.focus();
        break;
      case 4:
        input4.current.focus();
        break;
      case 5:
        input5.current.focus();
        break;
      default:
        break;
    }
  };

  return (
    <form autoComplete="off" className="form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          id="guess1"
          name="guess1"
          disabled={disableAll || disabled || false}
          value={guess1}
          ref={input1}
          className={`${inputStyle1 ? inputStyle1 : "white"}`}
          maxLength="1"
          onChange={(e) => setGuess1(e.target.value)}
          onKeyUp={jumpToNext}
        />
        <input
          type="text"
          id="guess2"
          name="guess2"
          disabled={disableAll || disabled || false}
          value={guess2}
          ref={input2}
          className={`${inputStyle1 ? inputStyle2 : "white"}`}
          maxLength="1"
          onChange={(e) => setGuess2(e.target.value)}
          onKeyUp={(e) => jumpToNext(e)}
        />
        <input
          type="text"
          id="guess3"
          name="guess3"
          disabled={disableAll || disabled || false}
          value={guess3}
          ref={input3}
          className={`${inputStyle1 ? inputStyle3 : "white"}`}
          maxLength="1"
          onChange={(e) => setGuess3(e.target.value)}
          onKeyUp={(e) => jumpToNext(e)}
        />
        <input
          type="text"
          id="guess4"
          name="guess4"
          disabled={disableAll || disabled || false}
          value={guess4}
          ref={input4}
          className={`${inputStyle1 ? inputStyle4 : "white"}`}
          maxLength="1"
          onChange={(e) => setGuess4(e.target.value)}
          onKeyUp={(e) => jumpToNext(e)}
        />
        <input
          type="text"
          id="guess5"
          name="guess5"
          disabled={disableAll || disabled || false}
          value={guess5}
          ref={input5}
          className={`${inputStyle1 ? inputStyle5 : "white"}`}
          maxLength="1"
          onChange={(e) => setGuess5(e.target.value)}
          onKeyUp={(e) => jumpToNext(e)}
        />
      </div>
      <button className="btn" type="submit"></button>
    </form>
  );
};

export default Block;
