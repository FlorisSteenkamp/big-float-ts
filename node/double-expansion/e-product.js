"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eProduct = void 0;
const expansion_product_1 = require("./expansion-product");
const two_product_1 = require("../basic/two-product");
const scale_expansion_1 = require("./scale-expansion");
const e_compress_1 = require("./e-compress");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansion_product_1.expansionProduct;
const tp = two_product_1.twoProduct;
const multByDouble = scale_expansion_1.scaleExpansion;
const compress = e_compress_1.eCompress;
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
exports.eProduct = eProduct;
//# sourceMappingURL=e-product.js.map