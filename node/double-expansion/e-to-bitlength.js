"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eToBitlength = void 0;
const e_sign_1 = require("./e-sign");
const msb_exponent_1 = require("../double-representation/msb-exponent");
const e_compress_1 = require("./e-compress");
const reduce_significand_1 = require("../basic/reduce-significand");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = e_sign_1.eSign;
const compress = e_compress_1.eCompress;
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
    let maxMsb = msb_exponent_1.msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        let msb_ = msb_exponent_1.msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    let keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduce_significand_1.reduceSignificand(b, keepBits);
    let result = a.slice(i);
    result[0] = b;
    return result;
}
exports.eToBitlength = eToBitlength;
//# sourceMappingURL=e-to-bitlength.js.map