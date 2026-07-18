import { expansionProduct as mult } from "./expansion-product.js";
import { twoProduct as tp } from "../basic/two-product.js";
import { scaleExpansion as multByDouble } from "./scale-expansion.js";
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
function eCalculate(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let product = term[0];
        for (let j = 1; j < term.length; j++) {
            const multiplicant = term[j];
            if (multiplicant.length == 1) {
                if (product.length === 1) {
                    product = tp(product[0], multiplicant[0]);
                }
                else {
                    product = multByDouble(product, multiplicant[0]);
                }
            }
            else if (product.length === 1) {
                product = multByDouble(multiplicant, product[0]);
            }
            else {
                product = mult(multiplicant, product);
            }
        }
        // add
        if (product.length === 1) {
            if (total.length === 1) {
                total = ts(total[0], product[0]);
            }
            else {
                total = addDouble(total, product[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(product, total[0]);
            }
            else {
                total = add(total, product);
            }
        }
    }
    return total;
}
export { eCalculate };
//# sourceMappingURL=e-calculate.js.map