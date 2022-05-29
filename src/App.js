import './App.css';
import init, {eval_lisp_prg} from 'wasm-lib';
import { useEffect, useState } from 'react';

function App() {
  const [result, setResult] = useState();
  useEffect(() => {
    init().then(() => {
      let r = eval_lisp_prg('(+ 1 8)');
      console.log("UseEffect: Setting result", r);
      setResult(r);
    }) 
  }, []);

  const getResult = () => {
    init().then(() => {
      let r = eval_lisp_prg("(+ 1 2)");
      console.log("Get Result: Setting result", r);
      setResult(r);
    });
  };
  return (
    <div className="App">
      <h4> {result}</h4>
    </div>
  );
}

export default App;
