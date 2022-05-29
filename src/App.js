import './App.css';
import init, {eval_lisp_prg} from 'wasm-lib';
import { useEffect, useState } from 'react';

function App() {
  const [result, setResult] = useState();
  const [input, setInput] = useState('');

  useEffect(() => {
    init().then(() => {
      if (input) {
        let r = eval_lisp_prg(input);
        console.log("UseEffect: Setting result", r);
        setResult(r);
      }
    }) 
  }, []);

  const getResult = () => {
    
    init().then(() => {
      console.log("Button Click: Getting result for", input);
      let r = eval_lisp_prg(input);
      console.log("Button Click: Setting result to", r);
      setResult(r);
    });
  };

  const updateInput = (e) => {
    setInput(e.target.value);
    console.log("Input: Setting input", e.target.value);
  };

  return (
    <div className="App">
      <textarea onChange={updateInput}/>
      <h4> {result}</h4>
    <button onClick={getResult}>Get Result</button>       
    </div>
  );
}

export default App;
