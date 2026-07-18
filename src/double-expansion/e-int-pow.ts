import { eProduct as prod } from "./e-product.js";
import { expansionProduct as mult } from "./expansion-product.js";


/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a: number[], p: number) {
    // a^0 === 1
    if (p === 0) { return [1]; }
    // a^1 === a
    if (p === 1) { return a; }

    if (p === 2) { 
        return mult(a,a); 
    }

    const as: number[][] = [];
    for (let i=0; i<p; i++) {
        as.push(a);
    }
    
    return prod(as);
}


export { eIntPow }
