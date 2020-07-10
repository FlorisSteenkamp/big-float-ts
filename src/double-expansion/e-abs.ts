
import { eSign } from "./e-sign";
import { eNegativeOf } from "./e-negative-of";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = eSign;
const negativeOf = eNegativeOf;


/**
 * Returns the absolute value of the given floating point expansion.
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param a a floating point expansion
 */
function eAbs(a: number[]) {
    if (sign(a) < 0) {
        return negativeOf(a);
    }

    return a;
}


export { eAbs }
