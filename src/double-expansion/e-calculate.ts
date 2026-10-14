import { eProductUncompressed } from "./e-product.js";
import { twoSum as ts } from "../basic/two-sum.js";
import { growExpansion as addDouble } from "./grow-expansion.js";
import { fastExpansionSum as add } from "./fast-expansion-sum.js";


/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
 *
 * * the result is not compressed, call `eCompress` on the result if required.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of terms to be summed; A term consists of an
 * array of floating point expansions to be multiplied together.
 */
// The terms parameter were chosen to always be expansions in order to keep the
// function monomorhic, but whether it's really worth it I am not sure.
function eCalculate(terms: number[][][]) {
    // Each product is added to the total immediately rather than collecting
    // the products and calling `eSum` - the latter is up to ~20% slower for
    // small terms.
    let total = [0];
    for (let i=0; i<terms.length; i++) {
        const product = eProductUncompressed(terms[i]);

        if (product.length === 1) {
            total = total.length === 1
                ? ts(total[0], product[0])
                : addDouble(total, product[0]);
        } else {
            total = total.length === 1
                ? addDouble(product, total[0])
                : add(total, product);
        }
    }

    return total;
}


export { eCalculate }
