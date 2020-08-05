
import { eDiv as eDiv_ } from "./e-div";
import { eSign as eSign_ } from "./e-sign";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eDiv = eDiv_;
const eSign = eSign_;


/**
 * Returns the result of the integer division a/b. 
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */
// TODO - improve function
// TODO - more tests
function eIntDiv(
        N: number[], D: number[]) {

    if (eSign(D) === 0) {
        throw new Error('division by zero');
    }
    
    let _r = eDiv(N, D, Math.max(N.length, D.length));

    let r: number[] = [];
    for (let i=0; i<_r.length; i++) {
        let v = Math.trunc(_r[i]);
        if (v !== 0) {
            r.push(v);
        }
    }

    return r;
}


export { eIntDiv }
