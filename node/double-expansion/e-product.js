import { expansionProduct } from "./expansion-product.js";
import { twoProduct } from "../basic/two-product.js";
import { scaleExpansion } from "./scale-expansion.js";
import { eCompress } from "./e-compress.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const tp = twoProduct;
const multByDouble = scaleExpansion;
const compress = eCompress;
/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms an array of multiplicands
 */
function eProduct(term) {
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
    return compress(product);
    //return product;
}
export { eProduct };
//# sourceMappingURL=e-product.js.map