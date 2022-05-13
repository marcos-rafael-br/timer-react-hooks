import { useState, useRef } from "react";
import "./App.css";
import song from "./hollow.mp3";

function App() {
  const [time, setTime] = useState({ minutos: 0, segundos: 0 });
  const [audio] = useState(new Audio(song));

  //Como usar audio.pause, source https://stackoverflow.com/questions/63003690/unable-to-pause-audio-in-reactjs

  const interval = useRef(null);

  function handleChange({ target }) {
    const { value } = target;
    setTime({ ...time, minutos: value * 60, segundos: value });
  }

  const minuts = Math.floor(time.minutos / 60);
  const seconds = time.minutos % 60; // retorna o resto da divisão

  function handleClickStart() {
    if (interval.current === null) {
      let counter = 0;
      interval.current = setInterval(() => {
        time.minutos > 0
          ? setTime((prev) => ({ ...prev, minutos: prev.minutos - 1 }))
          : setTime((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
        counter++;
        //como para timer no 0 , https://tutorial.eyehunts.com/js/javascript-setinterval-method-stop-loop-examples/
        if (counter === time.minutos) {
          clearInterval(interval.current);
          audio.pause();
        }
      }, 1000);
    }
    audio.play();
  }
  //como usar prev state, https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook

  function handleClickStop() {
    clearInterval(interval.current);
    interval.current = null;
    audio.pause();
  }
  //Como parar o timer, https://stackoverflow.com/questions/70740863/javascript-on-click-function-to-start-and-stop-intervals

  return (
    <div className="container">
      <header className="App-header">
        <h2>FINAL FANTASY TIMER</h2>
      </header>
      <div className="form">
        <label>
          <input type="text" name="minutos" onChange={handleChange} /> MIN
        </label>
        <label>
          <input type="text" name="segundos" onChange={handleChange} /> SEC
        </label>
      </div>
      <div>
        <span className="minutes">{minuts.toString().padStart(2, "0")}</span>
        <span className="seconds">{seconds.toString().padStart(2, "0")}</span>
      </div>
      <div className="button-container">
        <button onClick={handleClickStart}>Iniciar</button>
        <button onClick={handleClickStop}>Parar</button>
      </div>
    </div>
  );
}

export default App;
