import { eProduct } from "./e-product.js";
import { expansionProduct } from "./expansion-product.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const prod = eProduct;
/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    if (p === 2) {
        return mult(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return prod(as);
}
export { eIntPow };
//# sourceMappingURL=e-int-pow.js.map