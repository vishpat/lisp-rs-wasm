use lisp_rs::*; 
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn eval_lisp_prg(program: &str) -> String
{
    lisp_rs_eval(program)
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
