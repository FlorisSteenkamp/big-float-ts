import { eEstimate } from "./e-estimate.js";
import { expansionProduct as mult } from "./expansion-product.js";
import { eDiff as diff } from "./e-diff.js";
import { eToBitlength as toBitlength } from "./e-to-bitlength.js";
import { expBitLength as bitLength } from "../double-representation/bit-length.js";
import { eCompress } from "./e-compress.js";
import { eSign } from "./e-sign.js";


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
    let D_ = eCompress(D);
    if (eSign(D_) === 0) { throw new Error('division by zero'); }
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
    let F = [1/eEstimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = eCompress(mult(N_, F));

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
                return N_;
            }

            // Returning only significant bits helps with sign determination 
            // later on (`N_` is compressed so its top components are the most
            // significant).
            return N_.slice(Math.max(0, N_.length - expansionLength));
        }

        D_ = eCompress(mult(D_, F));
        
        i *= 2;

        // `D_` is now within about 2^(-53*i/2) of 1 so `F` only needs about
        // 53*i significant bits for the next iteration; truncating it (with a
        // generous margin) keeps the expansions from growing without bound
        // and does not affect the exactness of `N_/D_` since both are 
        // multiplied by the same `F`.
        F = toBitlength(diff([2], D_), 2*53*i + 53);
    }
}


export { eDiv }
