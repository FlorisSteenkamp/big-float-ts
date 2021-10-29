import { fastExpansionSum } from "./fast-expansion-sum.js";
import { scaleExpansion } from "./scale-expansion.js";
import { eCompress } from "./e-compress.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scaleExpansion;
const add = fastExpansionSum;
const compress = eCompress;
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations.
 *
 * Implemented naively and not as described by Shewchuk (i.e. the algorithm
 * takes O(k^2) operations).
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    let sum = [0];
    for (let i = 0; i < e.length; i++) {
        sum = add(sum, multByDouble(f, e[i]));
    }
    //return compress(sum);
    return sum;
}
export { expansionProduct };
//# sourceMappingURL=expansion-product.js.map