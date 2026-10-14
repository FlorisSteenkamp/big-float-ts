import { fastExpansionSum as add } from "./fast-expansion-sum.js";
import { scaleExpansion as multByDouble } from "./scale-expansion.js";
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * * the result is not compressed, call `eCompress` on the result if required.
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations, which is what is implemented here.
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    if (e.length === 1) {
        return multByDouble(f, e[0]);
    }
    if (f.length === 1) {
        return multByDouble(e, f[0]);
    }
    if (e.length === 0 || f.length === 0) {
        return [0];
    }
    // form the expansions e*f_1, e*f_2, ... (iterating over the shorter one)
    if (e.length < f.length) {
        [e, f] = [f, e];
    }
    let terms = [];
    for (let i = 0; i < f.length; i++) {
        terms.push(multByDouble(e, f[i]));
    }
    // ... then sum them pairwise using a distillation tree
    while (terms.length > 1) {
        const next = [];
        for (let i = 0; i < terms.length; i += 2) {
            next.push(i + 1 < terms.length ? add(terms[i], terms[i + 1]) : terms[i]);
        }
        terms = next;
    }
    return terms[0];
}
export { expansionProduct };
//# sourceMappingURL=expansion-product.js.map