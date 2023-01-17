
import { eEstimate } from "./e-estimate.js";
import { expansionProduct } from "./expansion-product.js";
import { eDiff } from "./e-diff.js";
import { eToBitlength } from "./e-to-bitlength.js";
import { expBitLength } from "../double-representation/bit-length.js";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const toBitlength = eToBitlength;
const bitLength = expBitLength;
const diff = eDiff;
const estimate = eEstimate;


/**
 * Returns the result of a/b using Goldschmidt division. 
 * 
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the 
 * result will be rounded to the longest bitlength between a and b.
 * 
 * @param a the numerator
 * @param b the denominator
 * 
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means double-double, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm) 
 * then set expansionLength === 0 and an exact division will be done.
 */
// TODO - test this function properly or replace with a better one
function eDiv(N: number[], D: number[], expansionLength: number) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        const bitlengthN = bitLength(N_);
        const bitlengthD = bitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1/estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = mult(N_, F);

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
        
        F = diff([2], D_);
        
        i *= 2;
    }
}


export { eDiv }
