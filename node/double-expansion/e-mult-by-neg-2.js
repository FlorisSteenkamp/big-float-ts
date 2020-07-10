"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eMultByNeg2 = void 0;
/**
 * Multiply a floating point expansion by -2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultByNeg2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(-2 * e[i]);
    }
    return e_;
}
exports.eMultByNeg2 = eMultByNeg2;
//# sourceMappingURL=e-mult-by-neg-2.js.map