import { eSign } from "./e-sign.js";
import { msbExponent } from "../double-representation/msb-exponent.js";
import { eCompress } from "./e-compress.js";
import { reduceSignificand } from "../basic/reduce-significand.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = eSign;
const compress = eCompress;
/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = compress(a);
    if (sign(a) === 0) {
        return [0];
    }
    let maxMsb = msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        let msb_ = msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    let keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduceSignificand(b, keepBits);
    let result = a.slice(i);
    result[0] = b;
    return result;
}
export { eToBitlength };
//# sourceMappingURL=e-to-bitlength.js.map