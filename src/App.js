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
          <Block block={1} />
          <Block block={2} />
          <Block block={3} />
          <Block block={4} />
          <Block block={5} />
          <Block block={6} />
        </div>
        {showModal && <Modal />}
      </div>
    </>
  );
}

export default App;
