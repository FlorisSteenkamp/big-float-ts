"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eCalculate = void 0;
const expansion_product_1 = require("./expansion-product");
const two_product_1 = require("../basic/two-product");
const scale_expansion_1 = require("./scale-expansion");
const two_sum_1 = require("../basic/two-sum");
const grow_expansion_1 = require("./grow-expansion");
const fast_expansion_sum_1 = require("./fast-expansion-sum");
const e_compress_1 = require("./e-compress");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansion_product_1.expansionProduct;
const tp = two_product_1.twoProduct;
const multByDouble = scale_expansion_1.scaleExpansion;
const ts = two_sum_1.twoSum;
const addDouble = grow_expansion_1.growExpansion;
const add = fast_expansion_sum_1.fastExpansionSum;
const compress = e_compress_1.eCompress;
/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
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
    //return compress(total);
    return total;
}
exports.eCalculate = eCalculate;
//# sourceMappingURL=e-calculate.js.map