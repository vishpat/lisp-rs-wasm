import './App.css';
import init, { eval_lisp_prg } from 'wasm-lib';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      if (input) {
        var prog_input = input;
        if (input.length > 4 && input[0] == '(' && input[1] != '(' && 
            input[input.length - 1] == ')' && input[input.length - 2] != ')') {
          prog_input = '(' + input + ')';
        } 

        console.log("Button Click: Getting result for", prog_input);
        let r = eval_lisp_prg(prog_input);
        console.log("Button Click: Setting result", r);
        var final_result = r;
        if (r && r[0] == '(' && r[r.length - 1] == ')') {
          final_result = r.substring(1, r.length - 1);
        }
        setResult(final_result);
      }
    });
  };

  const updateInput = (e) => {
    setInput(e.target.value);
    console.log("Input: Setting input", e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Lisp Interpreter in the browser using WASM</h1>
        <p>This webpage runs a <a href="https://webassembly.org/"> WASM </a> Lisp Interpreter in the browser. 
        The interpreter was written in <a href="https://www.rust-lang.org">Rust</a> and it's 
          implementation can found <a href="http://github.com/vishpat/lisp-rs">here.</a></p>
      </div>
      <div className="container">
        <textarea rows="10" columns="20" className="form-control" onChange={updateInput} />
      </div>
      <div className="container-fluid">
        <h4> {result}</h4>
        <button class="btn btn-primary" onClick={getResult}>Get Result</button>
      </div>

    </div>
  );
}

export default App;
