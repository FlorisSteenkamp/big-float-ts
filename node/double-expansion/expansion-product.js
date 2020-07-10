"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expansionProduct = void 0;
const fast_expansion_sum_1 = require("./fast-expansion-sum");
const scale_expansion_1 = require("./scale-expansion");
const e_compress_1 = require("./e-compress");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scale_expansion_1.scaleExpansion;
const add = fast_expansion_sum_1.fastExpansionSum;
const compress = e_compress_1.eCompress;
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
exports.expansionProduct = expansionProduct;
//# sourceMappingURL=expansion-product.js.map