import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useGlobalContext } from "./globalContext";

const Block = ({ block }) => {
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
  const [testState, setTestState] = useState(false);

  const [guessIndex, setGuessIndex] = useState(1);

  const {
    word,
    disableAll,
    setDisableAll,
    setWon,
    setShowModal,
    attempts,
    setAttempts,
    currentRow,
    setCurrentRow,
  } = useGlobalContext();

  const [disabled, setDisabled] = useState(false);
  const [disabledState, setDisabledState] = useState(false);

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
        setCurrentRow((currentRow) => {
          return currentRow + 1;
        });
      }
    }
  };

  const jumpToNext = (e) => {
    e.preventDefault();
    let isRemoval = false;
    const regex = /^[A-Za-z]{1}$/;

    if (!e.key.match(regex)) {
      console.log("didn't match");
      if (e.key === "Backspace" || e.key === "Delete") {
        console.log("in backspace");
        if (guessIndex > 1) {
          setGuessIndex((guessIndex) => {
            return guessIndex - 1;
          });
        }
        isRemoval = true;
      } else {
        console.log("in blank return");
        return;
      }
    } else {
      if (guessIndex >= 1 && guessIndex < 5) {
        setGuessIndex((guessIndex) => {
          return guessIndex + 1;
        });
      }
    }

    let position = document.querySelector(`input[name=guess${guessIndex}]`);
    switch (guessIndex) {
      case 1:
        setGuess1(isRemoval ? "" : e.key);
        position.focus();
        // input2.current.focus();
        break;
      case 2:
        setGuess2(isRemoval ? "" : e.key);
        position.focus();
        // input3.current.focus();
        break;
      case 3:
        setGuess3(isRemoval ? "" : e.key);
        position.focus();
        // input4.current.focus();
        break;
      case 4:
        setGuess4(isRemoval ? "" : e.key);
        position.focus();
        // input5.current.focus();
        break;
      case 5:
        setGuess5(isRemoval ? "" : e.key);
        position.focus();
        // input5.current.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (disableAll || disabled || block !== currentRow) {
      setDisabledState(true);
    } else {
      setDisabledState(false);
      setTestState(!testState);
    }
  }, [disableAll, disabled, currentRow, block]);

  useEffect(() => {
    console.log(block, currentRow, guessIndex, "ran");
    if (block === currentRow && disabledState === false) {
      input1.current.focus();
      console.log(document.activeElement);
    }
  }, [testState]);

  return (
    <form autoComplete="off" className="form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          id="guess1"
          name="guess1"
          disabled={disabledState}
          value={guess1}
          ref={input1}
          className={`${inputStyle1 ? inputStyle1 : "white"}`}
          maxLength="1"
          onChange={() => {}}
          onKeyUp={jumpToNext}
        />
        <input
          type="text"
          id="guess2"
          name="guess2"
          disabled={disabledState}
          value={guess2}
          ref={input2}
          className={`${inputStyle2 ? inputStyle2 : "white"}`}
          maxLength="1"
          onChange={() => {}}
          onKeyUp={jumpToNext}
        />
        <input
          type="text"
          id="guess3"
          name="guess3"
          disabled={disabledState}
          value={guess3}
          ref={input3}
          className={`${inputStyle3 ? inputStyle3 : "white"}`}
          maxLength="1"
          onChange={() => {}}
          onKeyUp={jumpToNext}
        />
        <input
          type="text"
          id="guess4"
          name="guess4"
          disabled={disabledState}
          value={guess4}
          ref={input4}
          className={`${inputStyle4 ? inputStyle4 : "white"}`}
          maxLength="1"
          onChange={() => {}}
          onKeyUp={jumpToNext}
        />
        <input
          type="text"
          id="guess5"
          name="guess5"
          disabled={disabledState}
          value={guess5}
          ref={input5}
          className={`${inputStyle5 ? inputStyle5 : "white"}`}
          maxLength="1"
          onChange={() => {}}
          onKeyUp={jumpToNext}
        />
      </div>
      <button className="btn" type="submit"></button>
    </form>
  );
};

export default Block;
