"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eCompare = void 0;
const e_diff_1 = require("./e-diff");
const e_sign_1 = require("./e-sign");
/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * "The easiest way to compare two expansions is to subtract one from the other,
 * and test the sign of the result. An expansion’s sign can be easily tested
 * because of the nonoverlapping property; simply check the sign of the
 * expansion's most significant nonzero component..."
 *
 * @param a a floating point expansion
 * @param b another floating point expansion
 */
function eCompare(a, b) {
    return e_sign_1.eSign(e_diff_1.eDiff(a, b));
}
exports.eCompare = eCompare;
//# sourceMappingURL=e-compare.js.map