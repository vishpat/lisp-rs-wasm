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
        <p>This webpage runs a <a href="https://webassembly.org/"> WASM </a> Lisp Interpreter in the browser. 
        The interpreter was written in <a href="https://www.rust-lang.org">Rust</a> and it's 
          implementation can found <a href="http://github.com/vishpat/lisp-rs">here.</a></p> 
          You can run some of the Lisp programs using the textbox below. Information 
          regarding the syntax and some sample programs can be found <a href="https://github.com/vishpat/lisp-rs/wiki/Lisp-Syntax"> here</a>
      </div>
      <div className="container">
        <textarea rows="10" columns="20" className="form-control" onChange={updateprogram} />
      </div>
      <div className="container-fluid">
        <h4> {result}</h4>
        <button className="btn btn-primary" onClick={getResult}>Get Result</button>
      </div>

    </div>
  );
}

export default App;
