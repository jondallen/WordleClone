import "./index.css";
import Title from "./Title";
import Block from "./Block";
import { useGlobalContext } from "./globalContext";
import hog from "./hog.jpg";
import Modal from "./Modal";

function App() {
  const { word, disableAll, setDisableAll, setWon, won, showModal } =
    useGlobalContext();
  return (
    <>
      <div className="wordle-container">
        <Title />
        <div className="tile-container">
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </div>
        {showModal && <Modal />}
      </div>
    </>
  );
}

export default App;
