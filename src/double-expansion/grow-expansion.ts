
import { eCompress } from "./e-compress.js";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = eCompress;


/**
 * Returns the result of adding a double to an expansion.
 * 
 * Let e be a nonoverlapping expansion of m p-bit components, and let b be a 
 * p-bit value where p >= 3. Suppose that the components e_1, ..., e_m are 
 * sorted in order of *increasing* magnitude, except that any of the ei may be 
 * zero. 
 * Then the following algorithm will produce a nonoverlapping expansion such 
 * that h = sum_i(h_i) = e + b, where the components h_1, ..., h_(m+1) are also
 * in order of increasing magnitude, except that any of the h_i may be zero. 
 * Furthermore, if e is nonadjacent and round-to-even tiebreaking is used, then 	
 * h is nonadjacent.
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param e A floating point expansion
 * @param b Another floating point expansion
 */
function growExpansion(e: number[], b: number): number[] {
    const m = e.length;

    let q = b;
    //const h: number[] = new Array(m+1);
    const h: number[] = [];
    //let j = 0;
    for (let i=0; i<m; i++) {
        // Note the use of twoSum and not fastTwoSum.
        //[h[i], q] = ts(q, e[i]);
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        let hh = (q - (x - bv)) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
         
        q = x;
    }
    //h[j] = q;
    if (q !== 0 || h.length === 0) { h.push(q); }

    //return compress(h);
    return h;
}


export { growExpansion }
