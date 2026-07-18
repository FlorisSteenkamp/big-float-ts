import { eNegativeOf } from "./e-negative-of.js";


/**
 * Returns the absolute value of the given floating point expansion.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */
function eAbs(e: number[]) {
    if (e[e.length-1] < 0) {
        return eNegativeOf(e);
    }

    return e;
}


export { eAbs }
