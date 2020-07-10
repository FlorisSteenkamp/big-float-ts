"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eAbs = void 0;
const e_sign_1 = require("./e-sign");
const e_negative_of_1 = require("./e-negative-of");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = e_sign_1.eSign;
const negativeOf = e_negative_of_1.eNegativeOf;
/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param a a floating point expansion
 */
function eAbs(a) {
    if (sign(a) < 0) {
        return negativeOf(a);
    }
    return a;
}
exports.eAbs = eAbs;
//# sourceMappingURL=e-abs.js.map