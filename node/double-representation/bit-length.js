"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expBitLength = exports.bitLength = void 0;
const get_max_set_bit_1 = require("./get-max-set-bit");
const e_compress_1 = require("../double-expansion/e-compress");
const exponent_1 = require("./exponent");
const e_sign_1 = require("../double-expansion/e-sign");
/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return get_max_set_bit_1.getHighestSetBit(a) - get_max_set_bit_1.getLowestSetBit(a) + 1;
}
exports.bitLength = bitLength;
/**
 * Returns the bit-length of the significand of the given floating point
 * expansion in such a way that trailing zeros are not counted.
 * * precondition: subnormals not currently supported
 * @param a A double precision floating point expansion
 */
function expBitLength(a) {
    let a_ = e_compress_1.eCompress(a);
    if (e_sign_1.eSign(a_) === 0) {
        return 0;
    }
    let msbyte = a_[a_.length - 1];
    let lsbyte = a_[0];
    return exponent_1.exponent(msbyte) - exponent_1.exponent(lsbyte) + (53 - get_max_set_bit_1.getLowestSetBit(lsbyte));
}
exports.expBitLength = expBitLength;
//# sourceMappingURL=bit-length.js.map