"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eDiv = void 0;
const e_estimate_1 = require("./e-estimate");
const expansion_product_1 = require("./expansion-product");
const e_diff_1 = require("./e-diff");
const e_to_bitlength_1 = require("./e-to-bitlength");
const bit_length_1 = require("../double-representation/bit-length");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansion_product_1.expansionProduct;
const toBitlength = e_to_bitlength_1.eToBitlength;
const bitLength = bit_length_1.expBitLength;
const diff = e_diff_1.eDiff;
const estimate = e_estimate_1.eEstimate;
/**
 * Returns the result of a/b using Goldschmidt division.
 *
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the
 * result will be rounded to the longest bitlength between a and b.
 * @param a the numerator
 * @param b the denominator
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means quad, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm)
 * then set expansionLength === 0 and an exact division will be done.
 */
// TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        // TODO
        //let expN = exponent(N_[N_.length-1]) - exponent(N_[0]) + 53;
        //let expD = exponent(D_[D_.length-1]) - exponent(D_[0]) + 53;
        //expansionLength = Math.max(N.length, D.length);
        //console.log(exponent(N[0]));
        //expansionLength = Math.max(expN, expD) / 53;
        //console.log(expansionLength);
        let bitlengthN = bitLength(N_);
        let bitlengthD = bitLength(D_);
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        //let resultBitlengthLowerBound = resultBitlengthUpperBound - 1; // <= true
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        //console.log('expansionLength', expansionLength);
        //console.log('bitlengthN', bitlengthN);
        //console.log('bitlengthD', bitlengthD);
        //console.log('resultBitlengthUpperBound', resultBitlengthUpperBound)
        exact = true;
    }
    let F = [1 / estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    //console.log('D ', estimate(D));
    //console.log('F ', estimate(F));
    //console.log('N ', N_);
    //console.log('D ', D_);
    //console.log('F ', F);
    //console.log('---------');
    while (true) {
        N_ = mult(N_, F);
        //console.log('N ', N_);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = toBitlength(N_, resultBitlengthUpperBound);
                // TODO - below is just for testing - remove later
                //if (compare(mult(D, N_), N) !== 0) {
                //    console.log(mult(D, N_))
                //    throw new Error(`division in-exact - probably due to underflow, N: ${N}, D: ${D}, Result: ${N_}, product: ${mult(D, N_)}`); 
                //} 
                return N_;
            }
            // Returning only significant bits helps with sign determination later on.
            return N_.slice(N_.length - expansionLength, N_.length);
        }
        D_ = mult(D_, F);
        //console.log('D ', estimate(D));
        //console.log('D ', D_);
        F = diff([2], D_);
        //console.log('F ', estimate(F));
        //console.log('F ', F);
        i *= 2;
    }
}
exports.eDiv = eDiv;
//# sourceMappingURL=e-div.js.map