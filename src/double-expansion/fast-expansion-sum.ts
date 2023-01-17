
import { eCompress } from "./e-compress.js";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = eCompress;


/**
 * Returns the result of adding two expansions.
 * 
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly 
 * nonoverlapping expansions of m and n p-bit components, respectively, where 
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a 
 * machine whose arithmetic uses the round-to-even rule, the following algorithm 
 * will produce a strongly nonoverlapping expansion h such that 
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in 
 * order of increasing magnitude, except that any of the h_i may be zero.
 * 
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastExpansionSum(e: number[], f: number[]) {
    //const g = merge(e,f);
    // inlined (above line)
    const lenE = e.length;
    const lenF = f.length;

    let i = 0;
    let j = 0;

    const g: number[] = [];

    while (i < lenE && j < lenF) {
        if (e[i] === 0) { i++; continue; }
        if (f[j] === 0) { j++; continue; }

        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            g.push(e[i]);
            i++;
        } else {
            g.push(f[j]);
            j++;
        }
    }

    while (i < lenE) {    
        g.push(e[i]);
        i++;
    }

    while (j < lenF) {    
        g.push(f[j]);
        j++;
    }

    if (g.length === 0) { 
        return [0]; 
    }
    // end inlined


    const len = g.length;
    if (len === 1) { return g; }

    //const h: number[] = new Array(len);
    const h: number[] = [];
    //const q: number;

    //[h[0], q] = fastTwoSum(g[1], g[0]);
    // inlined (above line)
    const a = g[1];
    const b = g[0];
    let q = a + b; 
    //h[0] = b - (q - a);
    const hh = b - (q - a);
    if (hh !== 0) { h.push(hh) }

    //let j = 0;
    j = 0;
    for (let i=2; i<len; i++) {
        //[h[i-1], q] = twoSum(q, g[i]);
        // inlined (above line)
        const b = g[i];
        const R = q + b; const _ = R - q; 
        //h[i-1] = (q - (R - _)) + (b - _);
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) { h.push(hh); }
        q = R;
    }
    //h[len-1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) { h.push(q); }

    //return compress(h);
    return h;
}


/**
 * Returns the result of merging an expansion e and f into a single expansion, 
 * in order of nondecreasing magnitude (possibly with interspersed zeros). 
 * (This function is zero-eliminating)
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e: number[], f: number[]) {
    const lenE = e.length;
    const lenF = f.length;

    let i = 0;
    let j = 0;

    const merged: number[] = [];

    while (i < lenE && j < lenF) {
        if (e[i] === 0) { i++; continue; }
        if (f[j] === 0) { j++; continue; }

        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        } else {
            merged.push(f[j]);
            j++;
        }
    }

    while (i < lenE) {    
        merged.push(e[i]);
        i++;
    }

    while (j < lenF) {    
        merged.push(f[j]);
        j++;
    }

    if (merged.length === 0) { 
        return [0]; 
    }

    return merged;
}


export { fastExpansionSum }
