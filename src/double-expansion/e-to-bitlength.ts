import { eSign } from "./e-sign.js";
import { msbExponent } from "../double-representation/msb-exponent.js";
import { eCompress } from "./e-compress.js";
import { reduceSignificand } from "../basic/reduce-significand.js";


/**
 * Returns a floating point expansion accurate to the given number of bits. 
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(
        a: number[], 
        l: number) {

    a = eCompress(a);
    if (eSign(a) === 0) { return [0]; }

    const maxMsb = msbExponent(a[a.length-1]);
    let msb = maxMsb;
    let i=a.length-1; // start at most significant byte
    while (i > 0) {
        const msb_ = msbExponent(a[i-1]);
        if (maxMsb-msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }

    const keepBits = Math.min(l - (maxMsb - msb), 53);
    const b = a[i];

    const result = a.slice(i);
    if (keepBits > 0) {
        result[0] = reduceSignificand(b, keepBits);
    } else {
        // The component lies just below the bits being kept (its msb is one
        // position below the kept lsb) so it rounds to either 0 or
        // `±2^(msb+1)`. (`reduceSignificand` is not valid for 0 bits.)
        const p = 2**msb;
        const absB = Math.abs(b);
        // On an exact tie the next lower component (if any) decides,
        // otherwise round to even (i.e. 0).
        const roundUp = absB > p ||
            (i > 0 && Math.sign(a[i-1]) === Math.sign(b));

        if (!roundUp) {
            // here `i` is not the top component (since then `keepBits >= 1`)
            return result.slice(1);
        }

        result[0] = Math.sign(b)*2*p;
    }

    return result;
}


export { eToBitlength }

