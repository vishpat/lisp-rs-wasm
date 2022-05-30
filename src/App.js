import './App.css';
import init, { eval_lisp_prg } from 'wasm-lib';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [result, setResult] = useState();
  const [program, setProgram] = useState('');

  useEffect(() => {
    init().then(() => {
      if (program) {
        let r = eval_lisp_prg(program);
        console.log("UseEffect: Setting result", r);
        setResult(r);
      }
    })
  }, []);

  const getResult = () => {

    init().then(() => {
      if (program) {
        var prog_program = "(" + program + ")";
        console.log("Button Click: Getting result for", prog_program);
        let r = eval_lisp_prg(prog_program);
        console.log("Button Click: Setting result", r);
        var final_result = r;
        if (r && r[0] === '(' && r[r.length - 1] === ')') {
          final_result = r.substring(1, r.length - 1);
        }
        setResult(final_result);
      }
    });
  };

  const updateprogram = (e) => {
    setProgram(e.target.value);
    console.log("program: Setting program", e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Lisp Interpreter in a browser using WASM</h1>
        <div className="alert alert-secondary" role="alert">
        <p align="left">This webpage hosts a Lisp Interpreter in a browser. 
        The interpreter is written in <a href="https://www.rust-lang.org">Rust</a> and compiled to <a href="https://webassembly.org/"> WASM </a>.
          The implementation of the interpreter can found <a href="http://github.com/vishpat/lisp-rs">here.</a> 
          The source code for the WASM bindings and this webapp can be found <a href="https://github.com/vishpat/lisp-rs-wasm">here.</a>  
          You can run the Lisp programs by typing in the code in the textbox below. Information 
          regarding the syntax and some sample programs for the Lisp dialect can be found <a href="https://github.com/vishpat/lisp-rs/wiki/Lisp-Syntax"> here</a>
        </p>
        </div>
      </div>
      <div className="container">
        <textarea rows="10" columns="20" className="form-control" onChange={updateprogram} />
      </div>
      <div className="container-fluid">
        <h4> {result}</h4>
        <button className="btn btn-primary" onClick={getResult}>Run</button>
      </div>

    </div>
  );
}

export default App;
