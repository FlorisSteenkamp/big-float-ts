import { expansionProduct as mult } from "./expansion-product.js";
import { eCompress } from "./e-compress.js";
/**
 * Returns a**p, where p is a non-negative integer.
 *
 * * uses 'repeated squaring', i.e. O(log p) expansion multiplications
 *
 * @param a a floating point expansion
 * @param p the power
 */
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    let result = undefined;
    let base = a;
    while (true) {
        if (p % 2 === 1) {
            result = result === undefined ? base : eCompress(mult(result, base));
        }
        p = Math.floor(p / 2);
        if (p === 0) {
            break;
        }
        base = eCompress(mult(base, base));
    }
    return result;
}
export { eIntPow };
//# sourceMappingURL=e-int-pow.js.map